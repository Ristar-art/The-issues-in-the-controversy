<script>
  import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
  } from 'firebase/auth';
  import { auth } from '$lib/firebase/client';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);
  let googleLoading = $state(false);

  async function createSessionAndRedirect(user) {
    const idToken = await user.getIdToken();
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to create session');
    }
    window.location.href = '/admin';
  }

  async function handleGoogleLogin() {
    error = '';
    googleLoading = true;
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const credential = await signInWithPopup(auth, provider);
      await createSessionAndRedirect(credential.user);
    } catch (err) {
      console.error('Google login error:', err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        // User closed the popup — silent.
      } else if (err.code === 'auth/popup-blocked') {
        error = 'Popup was blocked. Please allow popups and try again.';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        error = 'An account already exists with this email using a different sign-in method.';
      } else if (err.code === 'auth/unauthorized-domain') {
        error = 'This domain is not authorized for Google sign-in.';
      } else {
        error = err.message || 'Google sign-in failed. Please try again.';
      }
    } finally {
      googleLoading = false;
    }
  }

  let mode = $state('login'); // 'login' | 'reset'
  let resetEmail = $state('');
  let resetMessage = $state('');
  let resetError = $state('');
  let resetLoading = $state(false);

  function showReset() {
    mode = 'reset';
    resetEmail = email;
    resetMessage = '';
    resetError = '';
  }

  function showLogin() {
    mode = 'login';
    resetMessage = '';
    resetError = '';
  }

  async function handleReset(e) {
    e.preventDefault();
    resetError = '';
    resetMessage = '';
    resetLoading = true;

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      resetMessage = 'Password reset link sent. Check your inbox (and spam folder).';
    } catch (err) {
      console.error('Reset error:', err);
      if (err.code === 'auth/invalid-email') {
        resetError = 'Please enter a valid email address.';
      } else if (err.code === 'auth/user-not-found') {
        // Do not leak account existence — show same success message.
        resetMessage = 'Password reset link sent. Check your inbox (and spam folder).';
      } else if (err.code === 'auth/too-many-requests') {
        resetError = 'Too many attempts. Please try again later.';
      } else {
        resetError = err.message || 'Something went wrong. Please try again.';
      }
    } finally {
      resetLoading = false;
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await createSessionAndRedirect(credential.user);
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
    {#if mode === 'login'}
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

        <button type="submit" class="login-button" disabled={loading || googleLoading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div class="divider"><span>or</span></div>

      <button
        type="button"
        class="google-button"
        onclick={handleGoogleLogin}
        disabled={loading || googleLoading}
      >
        <svg class="google-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        {googleLoading ? 'Signing in...' : 'Continue with Google'}
      </button>

      <div class="login-footer">
        <button type="button" class="link-button" onclick={showReset}>
          Forgot password?
        </button>
      </div>
    {:else}
      <h1 class="login-title">Reset Password</h1>
      <p class="login-subtitle">Enter your email to receive a reset link</p>

      {#if resetError}
        <div class="login-error">{resetError}</div>
      {/if}
      {#if resetMessage}
        <div class="login-success">{resetMessage}</div>
      {/if}

      <form onsubmit={handleReset}>
        <div class="form-group">
          <label for="resetEmail">Email</label>
          <input
            id="resetEmail"
            type="email"
            bind:value={resetEmail}
            placeholder="admin@example.com"
            required
            disabled={resetLoading}
          />
        </div>

        <button type="submit" class="login-button" disabled={resetLoading}>
          {resetLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div class="login-footer">
        <button type="button" class="link-button" onclick={showLogin}>
          Back to sign in
        </button>
      </div>
    {/if}
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

  .login-success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }

  .login-footer {
    margin-top: 1.25rem;
    text-align: center;
  }

  .link-button {
    background: none;
    border: none;
    color: var(--color-accent);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    text-decoration: underline;
  }

  .link-button:hover {
    color: var(--color-accent-light);
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1.25rem 0;
    color: var(--color-stone);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-pearl);
  }

  .google-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.65rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-ink);
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .google-button:hover:not(:disabled) {
    background: var(--color-cream);
    border-color: var(--color-stone);
  }

  .google-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .google-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
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
