/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    // Load all components
    const componentsRes = await fetch('/api/components');
    const components = componentsRes.ok ? await componentsRes.json() : [];
    
    // Get custom components
    const customComponents = components.filter(/** @param {any} c */ c => c.category === 'custom');

    return {
      components,
      customComponents
    };
  } catch (err) {
    console.error('Error loading components:', err);
    return {
      components: [],
      customComponents: []
    };
  }
}
