<script>
  import { goto } from '$app/navigation';

  async function handleLogout() {
    await fetch('/api/session', { method: 'DELETE' });
    goto('/login');
  }
</script>

<nav class="admin-nav">
  <div class="admin-nav-inner">
    <div class="admin-nav-links">
      <a href="/admin" class="admin-brand">Admin</a>
      <a href="/admin/pages">Pages</a>
      <a href="/admin/components">Components</a>
      <a href="/admin/gallery">Gallery</a>
    </div>
    <button class="logout-button" onclick={handleLogout}>Sign Out</button>
  </div>
</nav>

<style>
  .admin-nav {
    background: var(--color-ink);
    border-bottom: 1px solid var(--color-charcoal);
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .admin-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
  }

  .admin-nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .admin-nav-links a {
    color: var(--color-silver);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.15s;
  }

  .admin-nav-links a:hover {
    color: var(--color-paper);
  }

  .admin-brand {
    font-weight: 700 !important;
    color: var(--color-paper) !important;
    font-size: 0.95rem !important;
    margin-right: 0.5rem;
  }

  .logout-button {
    background: none;
    border: 1px solid var(--color-graphite);
    color: var(--color-silver);
    padding: 0.3rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
  }

  .logout-button:hover {
    border-color: var(--color-silver);
    color: var(--color-paper);
  }
</style>
