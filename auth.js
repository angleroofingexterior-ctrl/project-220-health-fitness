(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const message = $('#authMessage');
  const status = $('#authStatus');
  const signOutButton = $('#signOut');

  const showMessage = (text, isError = false) => {
    message.textContent = text;
    message.className = isError ? 'status danger' : 'status';
  };

  const config = window.PROJECT220_AUTH || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) {
    status.textContent = 'Connect company Supabase account';
    showMessage('Authentication is safely disabled until the corporation adds its public Supabase project URL and anonymous browser key in auth-config.js.', true);
    document.querySelectorAll('form button, form input').forEach((element) => {
      element.disabled = true;
    });
    return;
  }

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  const renderSession = async () => {
    const { data, error } = await client.auth.getSession();
    if (error) {
      showMessage(error.message, true);
      return;
    }

    const user = data.session?.user;
    status.textContent = user ? `Signed in as ${user.email}` : 'Not signed in';
    signOutButton.classList.toggle('hidden', !user);
  };

  $('#signUpForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    showMessage('Creating your account…');

    const fullName = $('#signUpName').value.trim();
    const email = $('#signUpEmail').value.trim();
    const password = $('#signUpPassword').value;

    const { error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          app_role: 'customer',
          project: 'project-220'
        }
      }
    });

    if (error) {
      showMessage(error.message, true);
      return;
    }

    event.target.reset();
    showMessage('Account created. Check your email to confirm your address before signing in.');
    await renderSession();
  });

  $('#signInForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    showMessage('Signing in…');

    const { error } = await client.auth.signInWithPassword({
      email: $('#signInEmail').value.trim(),
      password: $('#signInPassword').value
    });

    if (error) {
      showMessage(error.message, true);
      return;
    }

    $('#signInPassword').value = '';
    showMessage('Signed in successfully.');
    await renderSession();
  });

  $('#resetPassword').addEventListener('click', async () => {
    const email = $('#signInEmail').value.trim();
    if (!email) {
      showMessage('Enter your email address first.', true);
      return;
    }

    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
    showMessage(error ? error.message : 'Password reset email sent.', Boolean(error));
  });

  signOutButton.addEventListener('click', async () => {
    const { error } = await client.auth.signOut();
    showMessage(error ? error.message : 'Signed out.', Boolean(error));
    await renderSession();
  });

  client.auth.onAuthStateChange(() => renderSession());
  renderSession();
})();
