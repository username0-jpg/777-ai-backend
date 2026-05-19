const SUPABASE_URL =
  "https://kmcrbguumketxanqmdja.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_jEv4QqASI4cLvU1gtasiow_Mi149jHi";

const supabaseClient =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

// SIGN UP

async function signUp(
  email,
  password
) {

  const {
    data,
    error
  } = await supabaseClient.auth.signUp({

    email,
    password

  });

  if (error) {

    alert(error.message);

    return;

  }

  alert(
    "Signup successful!"
  );

  console.log(data);

}

// LOGIN

async function login(
  email,
  password
) {

  const {
    data,
    error
  } = await supabaseClient.auth.signInWithPassword({

    email,
    password

  });

  if (error) {

    alert(error.message);

    return;

  }

  alert(
    "Logged in successfully!"
  );

  console.log(data);

  window.location.href =
    "./dashboard.html";

}

// GOOGLE LOGIN

async function googleLogin() {

  const {
    error
  } = await supabaseClient.auth.signInWithOAuth({

    provider: "google",

    options: {

      redirectTo:
        window.location.origin +
        "/dashboard.html"

    }

  });

  if (error) {

    alert(error.message);

  }

}

// LOGOUT

async function logout() {

  await supabaseClient.auth.signOut();

  window.location.href =
    "./login.html";

}

// CHECK USER

async function checkUser() {

  const {
    data
  } = await supabaseClient.auth.getUser();

  if (
    !data.user
  ) {

    window.location.href =
      "./login.html";

  }

  return data.user;

}