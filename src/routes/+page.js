export async function load({ fetch }) {
  const res = await fetch('/api/landing');

  if (!res.ok) {
    console.error('Failed to load landing data', res.status);
    return { landing: null };
  }

  const landing = await res.json();
  return { landing };
}
