import { Payload } from 'payload';
import { Category, WikiPage } from '../payload-types';


interface NavItem {
  id: string;
  title: string;
  slug?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavItem[];
  hasChildren?: boolean;
}

const buildPayloadQuery = (
  query: Record<string, any>
): Record<string, any> => {
  return query;
};

export const generateWikiNavigation = async (payload: Payload): Promise<void> => {
  try {
    const categoriesQuery = buildPayloadQuery({
      sort: 'sort',
      limit: 50,
    });
    
    const categoriesResult = await payload.find({
      collection: 'categories',
      ...categoriesQuery,
    });
    
    const categories = categoriesResult.docs || [];

    const navItems: NavItem[] = await Promise.all(
      categories.map(async (category: any) => {
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

        const pageNavItems: NavItem[] = await Promise.all(
          pages.map(async (page: any) => {
            const childrenQuery = buildPayloadQuery({
              where: {
                parent: { equals: page.id },
                status: { equals: 'published' },
                isSectionHomepage: { not_equals: true },
              },
              sort: 'sort',
              limit: 100,
            });
            
            const childrenResult = await payload.find({
              collection: 'wiki-pages',
              ...childrenQuery,
            });
            
            const hasChildren = childrenResult.totalDocs > 0;
            
            let children: NavItem[] = [];
            if (hasChildren) {
              children = await Promise.all(
                childrenResult.docs.map(async (childPage: any) => {
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

        return {
          id: category.id,
          title: category.name,
          isCategory: true,
          children: pageNavItems,
          hasChildren: pageNavItems.length > 0,
        };
      })
    );

    const filteredNavItems = navItems.filter(
      item => item.isCategory && item.children && item.children.length > 0
    );

    const existingCacheEntry = await payload.find({
      collection: 'navigation-cache' as any,
      where: {
        section: { equals: 'wiki' },
      },
      limit: 1,
    });

    if (existingCacheEntry.docs.length > 0) {
      await payload.update({
        collection: 'navigation-cache' as any,
        id: existingCacheEntry.docs[0].id,
        data: {
          navigationData: filteredNavItems,
        } as any,
      });
    } else {
      await payload.create({
        collection: 'navigation-cache' as any,
        data: {
          section: 'wiki',
          navigationData: filteredNavItems,
          lastGenerated: new Date(),
        } as any,
      });
    }

  } catch (error) {
  }
};
