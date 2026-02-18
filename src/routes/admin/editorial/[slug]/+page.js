/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const { slug } = params;
  
  try {
    // Load the article
    const articleRes = await fetch('/api/articles');
    if (!articleRes.ok) {
      throw new Error('Failed to load articles');
    }
    const articles = await articleRes.json();
    const article = articles.find(/** @param {any} a */ a => a.attributes?.slug === slug);
    
    if (!article) {
      return {
        status: 404,
        error: new Error('Article not found')
      };
    }
    
    // Load all available components
    const componentsRes = await fetch('/api/components');
    const allComponents = componentsRes.ok ? await componentsRes.json() : [];

    // Get custom components for the component block picker
    const customComponents = allComponents.filter(/** @param {any} c */ c => c.category === 'custom');

    // Initialize article blocks if not present
    if (!article.attributes.blocks) {
      article.attributes.blocks = [{ type: 'text', text: '' }];
    }

    return {
      article,
      customComponents,
      allComponents
    };
  } catch (err) {
    console.error('Error loading editorial page:', err);
    return {
      status: 500,
      error: new Error('Failed to load page')
    };
  }
}