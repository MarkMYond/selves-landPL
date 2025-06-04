import { Payload } from 'payload';
import { Category, WikiPage } from '../payload-types';


// Interface for navigation items
interface NavItem {
  id: string;
  title: string;
  slug?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavItem[];
  hasChildren?: boolean;
}

// Helper function to build Payload query parameters
const buildPayloadQuery = (
  query: Record<string, any>
): Record<string, any> => {
  return query;
};

/**
 * Generate wiki navigation JSON file
 * @param payload Payload CMS instance
 * @returns Promise<void>
 */
export const generateWikiNavigation = async (payload: Payload): Promise<void> => {
  console.log('Generating wiki navigation JSON...');
  
  try {
    // Instead of writing to a file, we'll store the navigation in the database

    // Fetch all categories
    const categoriesQuery = buildPayloadQuery({
      sort: 'sort',
      limit: 50,
    });
    
    const categoriesResult = await payload.find({
      collection: 'categories',
      ...categoriesQuery,
    });
    
    const categories = categoriesResult.docs || [];
    console.log(`Found ${categories.length} categories`);

    // Build the navigation structure
    const navItems: NavItem[] = await Promise.all(
      categories.map(async (category: any) => {
        // Find pages for this category
        const pagesQuery = buildPayloadQuery({
          where: {
            category: { equals: category.id },
            parent: { exists: false },
            status: { equals: 'published' },
            isSectionHomepage: { not_equals: true },
          },
          sort: 'sort',
          limit: 100,
        });
        
        const pagesResult = await payload.find({
          collection: 'wiki-pages',
          ...pagesQuery,
        });
        
        const pages = pagesResult.docs || [];
        console.log(`Found ${pages.length} pages for category ${category.name}`);

        // Process pages
        const pageNavItems: NavItem[] = await Promise.all(
          pages.map(async (page: any) => {
            // Check if page has children
            const childrenQuery = buildPayloadQuery({
              where: {
                parent: { equals: page.id },
                status: { equals: 'published' },
                isSectionHomepage: { not_equals: true },
              },
              sort: 'sort',
              limit: 100, // Increase limit to fetch all children
            });
            
            const childrenResult = await payload.find({
              collection: 'wiki-pages',
              ...childrenQuery,
            });
            
            const hasChildren = childrenResult.totalDocs > 0;
            
            // Process children
            let children: NavItem[] = [];
            if (hasChildren) {
              children = await Promise.all(
                childrenResult.docs.map(async (childPage: any) => {
                  // Check if child page has its own children (grandchildren)
                  const grandchildrenQuery = buildPayloadQuery({
                    where: {
                      parent: { equals: childPage.id },
                      status: { equals: 'published' },
                    },
                    limit: 1,
                  });
                  
                  const grandchildrenResult = await payload.find({
                    collection: 'wiki-pages',
                    ...grandchildrenQuery,
                  });
                  
                  const hasGrandchildren = grandchildrenResult.totalDocs > 0;
                  
                  return {
                    id: childPage.id,
                    title: childPage.title,
                    slug: childPage.slug,
                    icon: childPage.icon,
                    hasChildren: hasGrandchildren,
                    isCategory: false,
                  };
                })
              );
            }

            return {
              id: page.id,
              title: page.title,
              slug: page.slug,
              icon: page.icon,
              hasChildren,
              isCategory: false,
              children: children,
            };
          })
        );

        // Return category with its pages
        return {
          id: category.id,
          title: category.name,
          isCategory: true,
          children: pageNavItems,
          hasChildren: pageNavItems.length > 0,
        };
      })
    );

    // Filter out empty categories
    const filteredNavItems = navItems.filter(
      item => item.isCategory && item.children && item.children.length > 0
    );

    // Upsert navigation data to the NavigationCache collection
    // Using type casting to any to avoid TypeScript errors until types are regenerated
    const existingCacheEntry = await payload.find({
      collection: 'navigation-cache' as any,
      where: {
        section: { equals: 'wiki' },
      },
      limit: 1,
    });

    if (existingCacheEntry.docs.length > 0) {
      // Update existing entry
      await payload.update({
        collection: 'navigation-cache' as any,
        id: existingCacheEntry.docs[0].id,
        data: {
          navigationData: filteredNavItems,
        } as any,
      });
      console.log(`Wiki navigation updated in MongoDB cache (ID: ${existingCacheEntry.docs[0].id})`);
    } else {
      // Create new entry
      const createdCache = await payload.create({
        collection: 'navigation-cache' as any,
        data: {
          section: 'wiki',
          navigationData: filteredNavItems,
          lastGenerated: new Date(),
        } as any,
      });
      console.log(`Wiki navigation saved to MongoDB cache (ID: ${createdCache.id})`);
    }

  } catch (error) {
    console.error('Error generating wiki navigation:', error);
    throw error;
  }
};
