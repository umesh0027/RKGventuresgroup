// const transporter = require("../config/email");

// const sendEmail = async (to, subject, text, attachment) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL,
//     to,
//     subject,
//     text,
//     attachments: [
//       {
//         filename: "invoice.pdf",
//         content: attachment
//       }
//     ]
//   });
// };

// module.exports = sendEmail;


// const transporter = require("../config/email");

// const sendEmail = async (to, subject, text, attachment) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,

//     html: `
//       <h2>Order Confirmed ✅</h2>
//       <p>${text}</p>
//       <p><b>Thank you for choosing RKG Ventures Group</b></p>
//     `,

//     attachments: [
//       {
//         filename: "invoice.pdf",
//         content: attachment
//       }
//     ]
//   });
// };

// module.exports = sendEmail;

const transporter = require("../config/email");

const sendEmail = async (to, subject, text, attachment) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,

    html: `
      <div style="font-family: Arial; padding:20px; background:#f9fafb">
        <h2 style="color:#2563eb;">Order Update 📦</h2>

        <p style="font-size:16px;">${text}</p>

        <div style="margin-top:20px; padding:15px; background:#fff; border-radius:8px;">
          <p><b>Status:</b> ${text}</p>
        </div>

        <p style="margin-top:20px;">
          Thank you for choosing <b>RKG Ventures Group</b>
        </p>
      </div>
    `,

    // 🔥 attachment optional (status update me usually nahi chahiye)
    ...(attachment && {
      attachments: [
        {
          filename: "invoice.pdf",
          content: attachment
        }
      ]
    })
  });
};

module.exports = sendEmail;