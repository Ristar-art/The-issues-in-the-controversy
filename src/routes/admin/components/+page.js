export async function load({ fetch }) {
  const res = await fetch('/api/components');

  if (!res.ok) {
    console.error('Failed to load components', res.status);
    return { components: [] };
  }

  const components = await res.json();
  return { components };
}
