#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to patch PayloadCMS files
function patchPayloadFiles() {
  console.log('Patching PayloadCMS files for lockedState error...');

  // Find all PayloadCMS UI files that might contain the problematic code
  const searchPaths = [
    'node_modules/@payloadcms/ui/dist/exports/client/index.js',
    'node_modules/@payloadcms/ui/dist/providers/RouteCache/index.js',
    'node_modules/.pnpm/@payloadcms+ui@3.37.0*/node_modules/@payloadcms/ui/dist/exports/client/index.js',
    'node_modules/.pnpm/@payloadcms+ui@3.37.0*/node_modules/@payloadcms/ui/dist/providers/RouteCache/index.js'
  ];

  let patchedFiles = 0;

  searchPaths.forEach(searchPath => {
    try {
      // Use glob pattern to find files
      const { glob } = require('glob');
      const files = glob.sync(searchPath, { cwd: process.cwd() });
      
      files.forEach(filePath => {
        if (fs.existsSync(filePath)) {
          try {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Pattern 1: Replace destructuring of lockedState
            if (content.includes('const{lockedState') || content.includes('const {lockedState')) {
              content = content.replace(
                /const\s*{\s*lockedState([^}]*?)}\s*=\s*([^;,\n]+)/g,
                'const tempObj=$2||{};const{lockedState=false$1}=tempObj'
              );
              modified = true;
            }

            // Pattern 2: Replace direct property access
            if (content.includes('.lockedState')) {
              content = content.replace(
                /([a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\.lockedState/g,
                '($1&&$1.lockedState!==undefined?$1.lockedState:false)'
              );
              modified = true;
            }

            // Pattern 3: Replace any destructuring that might fail
            content = content.replace(
              /const\s*{\s*([^}]*lockedState[^}]*)\s*}\s*=\s*([^;,\n]+)/g,
              (match, destructuredVars, source) => {
                return `const tempObj=${source}||{};const{${destructuredVars}}=tempObj`;
              }
            );

            if (modified) {
              // Create backup
              fs.writeFileSync(filePath + '.backup', fs.readFileSync(filePath));
              
              // Write patched content
              fs.writeFileSync(filePath, content);
              console.log(`✅ Patched: ${filePath}`);
              patchedFiles++;
            }
          } catch (error) {
            console.warn(`⚠️  Could not patch ${filePath}:`, error.message);
          }
        }
      });
    } catch (error) {
      // Glob might not be available, skip this search path
    }
  });

  if (patchedFiles === 0) {
    console.log('⚠️  No PayloadCMS files found to patch. Trying alternative approach...');
    
    // Alternative: try to find any PayloadCMS files and patch them
    try {
      const { execSync } = require('child_process');
      
      // Find all JS files in PayloadCMS packages
      const findCommand = `find node_modules -name "*.js" -path "*@payloadcms*" -exec grep -l "lockedState" {} \\; 2>/dev/null || true`;
      const foundFiles = execSync(findCommand, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
      
      foundFiles.forEach(filePath => {
        if (fs.existsSync(filePath)) {
          try {
            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;

            // More comprehensive patches
            
            // Pattern 1: Basic destructuring with lockedState
            content = content.replace(
              /const\s*{\s*lockedState([^}]*?)}\s*=\s*([^;,\n]+)/g,
              'const tempObj=$2||{};const{lockedState=false$1}=tempObj'
            );

            // Pattern 2: Direct property access
            content = content.replace(
              /([a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\.lockedState/g,
              '($1&&$1.lockedState!==undefined?$1.lockedState:false)'
            );

            // Pattern 3: More complex destructuring patterns
            content = content.replace(
              /const\s*{\s*([^}]*lockedState[^}]*)\s*}\s*=\s*([^;,\n\)]+)/g,
              (match, destructuredVars, source) => {
                return `const tempObj=${source}||{};const{${destructuredVars}}=tempObj`;
              }
            );

            // Pattern 4: Handle specific buildFormState issues
            content = content.replace(
              /docPermissions:\s*{\s*lockedState[^}]*}/g,
              'docPermissions:{lockedState:false,canLock:true,isLocked:false}'
            );

            // Pattern 5: RouteCache specific fixes
            content = content.replace(
              /const\s+{\s*([^}]*)\s*}\s*=\s*([^;]+)\s*\|\|\s*{}/g,
              (match, vars, source) => {
                if (vars.includes('lockedState')) {
                  return `const tempObj=${source}||{};const{${vars.replace(/lockedState/g, 'lockedState=false')}}=tempObj`;
                }
                return match;
              }
            );

            if (content !== originalContent) {
              fs.writeFileSync(filePath + '.backup', originalContent);
              fs.writeFileSync(filePath, content);
              console.log(`✅ Patched: ${filePath}`);
              patchedFiles++;
            }
          } catch (error) {
            console.warn(`⚠️  Could not patch ${filePath}:`, error.message);
          }
        }
      });
    } catch (error) {
      console.warn('Could not run find command:', error.message);
    }
  }

  console.log(`\n🎉 Patching complete! Modified ${patchedFiles} files.`);
  
  if (patchedFiles > 0) {
    console.log('\n💡 To restore original files, run:');
    console.log('find node_modules -name "*.backup" -exec sh -c \'mv "$1" "${1%.backup}"\' _ {} \\;');
  }
}

// Run the patcher
patchPayloadFiles();
