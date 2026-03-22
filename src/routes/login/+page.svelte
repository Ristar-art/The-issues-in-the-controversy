<script>
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '$lib/firebase/client';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleLogin(e) {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      console.log('Attempting sign in for:', email);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful, getting token...');
      const idToken = await credential.user.getIdToken();
      console.log('Token received, creating session...');

      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create session');
      }

      // Use window.location for a full page reload to pick up the new cookie
      window.location.href = '/admin';
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        error = 'Invalid email or password.';
      } else if (err.code === 'auth/too-many-requests') {
        error = 'Too many attempts. Please try again later.';
      } else {
        error = err.message || 'Something went wrong. Please try again.';
      }
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Admin Login</title>
</svelte:head>

<div class="login-container">
  <div class="login-card">
    <h1 class="login-title">Admin Login</h1>
    <p class="login-subtitle">Sign in to manage your content</p>

    {#if error}
      <div class="login-error">{error}</div>
    {/if}

    <form onsubmit={handleLogin}>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="admin@example.com"
          required
          disabled={loading}
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="Enter your password"
          required
          disabled={loading}
        />
      </div>

      <button type="submit" class="login-button" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-cream);
    padding: 1rem;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    border-radius: 8px;
    padding: 2.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }

  .login-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-ink);
    margin: 0 0 0.25rem;
    text-align: center;
  }

  .login-subtitle {
    color: var(--color-stone);
    text-align: center;
    margin: 0 0 2rem;
    font-size: 0.95rem;
  }

  .login-error {
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-charcoal);
    margin-bottom: 0.4rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
    border: 1px solid var(--color-pearl);
    border-radius: 6px;
    background: var(--color-paper);
    color: var(--color-ink);
    transition: border-color 0.15s;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
  }

  .form-group input:disabled {
    opacity: 0.6;
  }

  .login-button {
    width: 100%;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-paper);
    background: var(--color-accent);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s;
    margin-top: 0.5rem;
  }

  .login-button:hover:not(:disabled) {
    background: var(--color-accent-light);
  }

  .login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
