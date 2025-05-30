// Initialize Supabase client
const supabase = window.supabase.createClient(
  'https://ivivpejkbrzmmrueikht.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2aXZwZWprYnJ6bW1ydWVpa2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDQ1NzgsImV4cCI6MjA2MjM4MDU3OH0.6Zxe36Sz7wU9toyLwlCs_77V0MexF2px3wGp7cB3ebc',
  {
    auth: {
      persistSession: true,  // Crucial for session persistence
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  }
);

window.authFunctions = {
  // 1. Auth functions
  async loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        shouldCreateUser: false
      }
    });

    if (error) {
      console.error('Full login error:', error);
      throw new Error(error.message || 'Login failed');
    }

    // Verify session was created
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Session not created');
    }

    return data;
  },

  async logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 2. User data functions
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('username, location')
      .eq('user_id', user.id)
      .single();

    return { ...user, ...profile };
  },

  uploadImages: async function (files, listingId) {
    const uploads = Array.from(files).map(async (file) => {
      const path = `listings/${listingId}/${file.name}`;
      const { data, error } = await supabase.storage
        .from('listing_images')
        .upload(path, file);

      if (error) throw error;
      return path;
    });

    return Promise.all(uploads);
  },

  async getUserData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return { ...user, username: data?.username };
  },

  // 3. Signup function
  signUpUser: async function ({ email, password, username, location, terms }) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const user_id = authData.user?.id;
    const { error: insertError } = await supabase.from('users').insert([{
      user_id,
      email,
      username,
      location,
      terms,
      created_at: new Date().toISOString()
    }]);

    if (insertError) throw insertError;
    return authData.user;
  },

  redirectIfUnauthenticated: async function () {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user) {
      // Only redirect if we're not already on login page
      if (!window.location.pathname.includes('login.html')) {
        window.location.href = '/login.html';
      }
      return null;
    }
    return user;
  }
};