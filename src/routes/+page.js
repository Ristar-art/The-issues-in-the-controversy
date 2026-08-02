// `data` is whatever +page.server.js returned. This universal load's return
// value replaces the page data wholesale, so it has to be spread back in or
// the server's payload (the YouTube playlist) is silently dropped.
export async function load({ fetch, data }) {
  const res = await fetch('/api/landing');

  if (!res.ok) {
    console.error('Failed to load landing data', res.status);
    return { ...data, landing: null };
  }

  const landing = await res.json();
  return { ...data, landing };
}
