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

  try {

    const {
      data,
      error
    } = await supabaseClient
      .auth
      .signUp({

        email,
        password,

        options: {

          emailRedirectTo:
            window.location.origin +
            "/dashboard.html"

        }

      });

    if (error) {

      alert(
        error.message
      );

      return;

    }

    // EMAIL VERIFICATION MESSAGE

    alert(

      "✅ Account created successfully!\n\nPlease check your email inbox to verify your account before logging in."

    );

    console.log(data);

  } catch (error) {

    console.log(error);

    alert(
      "Signup failed."
    );

  }

}

// LOGIN

async function login(
  email,
  password
) {

  try {

    const {
      data,
      error
    } = await supabaseClient
      .auth
      .signInWithPassword({

        email,
        password

      });

    if (error) {

      // EMAIL NOT VERIFIED

      if (

        error.message.includes(
          "Email not confirmed"
        )

      ) {

        alert(

          "⚠ Please verify your email before logging in.\n\nCheck your inbox."

        );

        return;

      }

      alert(
        error.message
      );

      return;

    }

    console.log(data);

    alert(
      "✅ Logged in successfully!"
    );

    // REDIRECT

    window.location.href =
      "./dashboard.html";

  } catch (error) {

    console.log(error);

    alert(
      "Login failed."
    );

  }

}

// GOOGLE LOGIN

async function googleLogin() {

  try {

    const {
      error
    } = await supabaseClient
      .auth
      .signInWithOAuth({

        provider: "google",

        options: {

          redirectTo:
            window.location.origin +
            "/dashboard.html"

        }

      });

    if (error) {

      alert(
        error.message
      );

    }

  } catch (error) {

    console.log(error);

  }

}

// LOGOUT

async function logout() {

  try {

    await supabaseClient
      .auth
      .signOut();

    window.location.href =
      "./login.html";

  } catch (error) {

    console.log(error);

  }

}

// CHECK USER

async function checkUser() {

  try {

    const {
      data
    } = await supabaseClient
      .auth
      .getUser();

    if (
      !data.user
    ) {

      window.location.href =
        "./login.html";

      return null;

    }

    return data.user;

  } catch (error) {

    console.log(error);

    return null;

  }

}

// AUTO SESSION CHECK

async function autoLoginRedirect() {

  const {
    data
  } = await supabaseClient
    .auth
    .getSession();

  // USER ALREADY LOGGED IN

  if (
    data.session &&
    window.location.pathname.includes(
      "login.html"
    )
  ) {

    window.location.href =
      "./dashboard.html";

  }

}

// START AUTO CHECK

autoLoginRedirect();