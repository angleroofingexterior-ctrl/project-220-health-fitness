// Copy this file to auth-config.js only in the deployment environment.
// The Supabase anonymous browser key is designed for client use, but database
// security must still be enforced through row-level security policies.
// Never place the service-role key, payment secrets or private API keys here.
window.PROJECT220_AUTH = {
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR-PUBLIC-ANON-KEY'
};
