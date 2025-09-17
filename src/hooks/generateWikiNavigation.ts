import type { Payload } from 'payload'; // Ensure Payload type is correctly imported
import type { Category, WikiPage } from '../payload-types'; // Import from local types

interface NavItem {
  id: string;
  title: string;
  slug?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavItem[];
  hasChildren?: boolean;
}

// Helper to assert if a value is a populated document with an ID
function isPopulatedDoc(doc: any): doc is { id: string; [key: string]: any } {
  return doc && typeof doc === 'object' && typeof doc.id === 'string';
}

export const generateWikiNavigation = async (payload: Payload): Promise<void> => {
  try {
    // 1. Fetch all relevant categories
    const categoriesResult = await payload.find({
      collection: 'categories',
      sort: 'sort',
      limit: 100, // Adjust if more categories
      depth: 0,
    });
    const categories = categoriesResult.docs as Category[];

    // 2. Fetch all published wiki pages that are not section homepages
    const allPagesResult = await payload.find({
      collection: 'wiki-pages', // Changed from 'registry-pages'
      where: {
        status: { equals: 'published' },
        isSectionHomepage: { not_equals: true },
      },
      limit: 1000, // Adjust if more pages
      depth: 1, // Populate parent and category to get their IDs and basic info
      sort: 'sort',
    });
    const allPages = allPagesResult.docs as WikiPage[]; // Changed from RegistryPage

    // 3. Create lookup maps for efficient tree building
    const pagesById: Map<string, WikiPage> = new Map();
    const pagesByParentId: Map<string, WikiPage[]> = new Map();
    const topLevelPagesByCategoryId: Map<string, WikiPage[]> = new Map();

    allPages.forEach(page => {
      pagesById.set(page.id, page);
      if (page.parent && (typeof page.parent === 'string' || isPopulatedDoc(page.parent))) {
        const parentId = typeof page.parent === 'string' ? page.parent : page.parent.id;
        if (!pagesByParentId.has(parentId)) pagesByParentId.set(parentId, []);
        pagesByParentId.get(parentId)!.push(page);
      } else if (page.category && (typeof page.category === 'string' || isPopulatedDoc(page.category))) {
        const categoryId = typeof page.category === 'string' ? page.category : page.category.id;
        if (!topLevelPagesByCategoryId.has(categoryId)) topLevelPagesByCategoryId.set(categoryId, []);
        topLevelPagesByCategoryId.get(categoryId)!.push(page);
      }
    });

    // Function to recursively build children
    const buildChildren = (parentId: string): NavItem[] => {
      const directChildren = pagesByParentId.get(parentId) || [];
      return directChildren.map((childPage): NavItem => {
        const grandChildren = pagesByParentId.get(childPage.id) || [];
        return {
          id: childPage.id,
          title: childPage.title,
          slug: childPage.slug,
          icon: childPage.icon || undefined,
          isCategory: false,
          hasChildren: grandChildren.length > 0,
          children: grandChildren.length > 0 ? buildChildren(childPage.id) : [],
        };
      });
    };
    
    // 4. Build the final navigation structure
    const navItems: NavItem[] = categories.map((category): NavItem => {
      const topLevelPages = topLevelPagesByCategoryId.get(category.id) || [];
      const pageNavItems: NavItem[] = topLevelPages.map((page): NavItem => {
        const children = buildChildren(page.id);
        return {
          id: page.id,
          title: page.title,
          slug: page.slug,
          icon: page.icon || undefined,
          isCategory: false,
          hasChildren: children.length > 0,
          children: children,
        };
      });

      return {
        id: category.id,
        title: category.name,
        isCategory: true,
        children: pageNavItems,
        hasChildren: pageNavItems.length > 0,
      };
    }).filter(item => item.isCategory && item.children && item.children.length > 0);

    // 5. Update or create cache entry
    const existingCacheEntry = await payload.find({
      collection: 'navigation-cache', // Using type assertion for collection slug
      where: {
        section: { equals: 'wiki' }, // Changed from 'registry'
      },
      limit: 1,
    });

    if (existingCacheEntry.docs.length > 0) {
      await payload.update({
        collection: 'navigation-cache', // Using type assertion
        id: existingCacheEntry.docs[0].id,
        data: {
          navigationData: navItems,
        },
      });
    } else {
      await payload.create({
        collection: 'navigation-cache', // Using type assertion
        data: {
          section: 'wiki', // Changed from 'registry'
          navigationData: navItems,
          lastGenerated: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    payload.logger.error({ msg: 'Error in generateWikiNavigation', err: error });
  }
};
