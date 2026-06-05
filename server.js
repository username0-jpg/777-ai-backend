require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { Resend } = require("resend");
const {
  createClient
} = require("@supabase/supabase-js");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// OPENAI

const openai = new OpenAI({

  apiKey:
    process.env.OPENAI_API_KEY

});

// SUPABASE

const supabaseUrl =
  "https://kmcrbguumketxanqmdja.supabase.co";

const supabaseKey =
  process.env.SUPABASE_KEY;

const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );
const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );
  const NOTIFY_EMAIL =
  "bell89770@gmail.com";
// CHAT ROUTE

app.post("/chat", async (req, res) => {
console.log("CHAT ROUTE HIT");
console.log(req.body);
  try {

    const userMessage =
      req.body.message;

    const businessId =
      req.body.businessId
      || "777luckydraws";

    const userEmail =
      req.body.userEmail
      || "owner@777luckydraws.com";

    // LOAD SETTINGS

    const {
      data: settings,
      error: settingsError
    } = await supabase
      .from("business_settings")
      .select("*")
      .eq(
        "business_id",
        businessId
      )
      .single();

    if (settingsError) {

      throw settingsError;

    }

    // EMAIL DETECTION

    const emailMatch =
      userMessage.match(
        /[^\s@]+@[^\s@]+\.[^\s@]+/
      );

    // SAVE LEAD
if (emailMatch) {

  const leadEmail =
    emailMatch[0];

  await supabase
    .from("leads")
    .insert([
      {
        email: leadEmail,
        message: userMessage,
        business_id: businessId,
        user_email: userEmail
      }
    ]);

  try {
console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);
console.log("NOTIFY EMAIL:", NOTIFY_EMAIL);
console.log("DEBUG TEST 777");
  const result = await resend.emails.send({

    from: "777Bot <onboarding@resend.dev>",

    to: NOTIFY_EMAIL,

    subject: "🔥 New Lead Captured",

    html: `
      <h2>New Lead</h2>

      <p><strong>Email:</strong> ${leadEmail}</p>

      <p><strong>Message:</strong> ${userMessage}</p>

      <p><strong>Business:</strong> ${businessId}</p>
    `

  });

  console.log("EMAIL RESULT");
  console.log(result);

} catch (err) {

  console.log("EMAIL ERROR");
  console.log(err);

}

 
}
    // AI RESPONSE

    const completion =
      await openai.chat.completions.create({

        model: "gpt-4o-mini",

        messages: [

          {

            role: "system",

            content: `

${settings.ai_prompt}

IMPORTANT:
- keep responses short
- be friendly
- collect customer details politely
- encourage signups

Rules:
- never invent information
- if unsure tell user to contact support

`

          },

          {

            role: "user",

            content:
              userMessage

          }

        ]

      });

    const aiReply =
      completion.choices?.[0]
      ?.message?.content
      || "No AI response";

    // SAVE CHAT HISTORY

    await supabase
      .from("chat_logs")
      .insert([
        {

          business_id:
            businessId,

          user_message:
            userMessage,

          ai_reply:
            aiReply

        }
      ]);

    // SEND RESPONSE

    res.json({

      reply:
        aiReply

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Something went wrong"

    });

  }

});

// GET USER BUSINESS

app.get("/my-business", async (req, res) => {

  try {

    const userEmail =
      req.query.userEmail;

    const {
      data,
      error
    } = await supabase
      .from("business_settings")
      .select("*")
      .eq(
        "user_email",
        userEmail
      )
      .single();

    if (error) {

      throw error;

    }

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Business not found"

    });

  }

});

// GET LEADS

app.get("/leads", async (req, res) => {

  try {

    const userEmail =
      req.query.userEmail;

    const {
      data,
      error
    } = await supabase
      .from("leads")
      .select("*")
      .eq(
        "user_email",
        userEmail
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );

    if (error) {

      throw error;

    }

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error loading leads"
    );

  }

});

// GET CHAT LOGS

app.get("/chat-logs", async (req, res) => {

  try {

    const businessId =
      req.query.businessId;

    const {
      data,
      error
    } = await supabase
      .from("chat_logs")
      .select("*")
      .eq(
        "business_id",
        businessId
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );

    if (error) {

      throw error;

    }

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error loading chats"
    );

  }

});

// GET SETTINGS

app.get("/settings", async (req, res) => {

  try {

    const businessId =
      req.query.businessId;

    const {
      data,
      error
    } = await supabase
      .from("business_settings")
      .select("*")
      .eq(
        "business_id",
        businessId
      )
      .single();

    if (error) {

      throw error;

    }

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error loading settings"
    );

  }

});

// SAVE SETTINGS

app.post("/settings", async (req, res) => {

  try {

    const {

      businessId,
      businessName,
      aiPrompt,
      primaryColor

    } = req.body;

    const {
      error
    } = await supabase
      .from("business_settings")
      .update({

        business_name:
          businessName,

        ai_prompt:
          aiPrompt,

        primary_color:
          primaryColor

      })
      .eq(
        "business_id",
        businessId
      );

    if (error) {

      throw error;

    }

    res.json({

      success: true

    });

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Error saving settings"
    );

  }

});

// CREATE BUSINESS

app.post("/create-business", async (req, res) => {

  try {

    const {

      businessId,
      businessName,
      userEmail,
      aiPrompt,
      primaryColor

    } = req.body;

    const {
      error
    } = await supabase
      .from("business_settings")
      .insert([
        {

          business_id:
            businessId,

          user_email:
            userEmail,

          business_name:
            businessName,

          ai_prompt:
            aiPrompt,

          primary_color:
            primaryColor

        }
      ]);

    if (error) {

      throw error;

    }

    const widgetCode = `

<script
  src="https://777-ai-backend.vercel.app/widget.js"
  data-business="${businessId}"
></script>

`;

    res.json({

      success: true,

      widgetCode

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Error creating business"

    });

  }

});

// TEST SUPABASE

app.get("/test-supabase", async (req, res) => {

  const {
    data,
    error
  } = await supabase
    .from("leads")
    .insert([
      {

        email:
          "test@gmail.com",

        message:
          "test message",

        business_id:
          "777luckydraws",

        user_email:
          "owner@777luckydraws.com"

      }
    ]);

  res.json({
    data,
    error
  });

});

// SERVER STATUS
app.get("/test-email", async (req, res) => {

  try {

    const result =
      await resend.emails.send({

        from:
          "777Bot <onboarding@resend.dev>",

        to:
          "777ltdcompany@gmail.com",

        subject:
          "777BotLtd Email Test",

        html:
          "<h1>Email system working</h1>"

      });

    console.log(result);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

});
app.get("/", (req, res) => {

  res.send(
    "777 AI Backend Running"
  );

});

// START SERVER

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});