const { Resend } = require('resend');

if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY is missing');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.SENDER_EMAIL || 'amanrawat1935@gmail.com';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'amanrawat1935@gmail.com';

const sendContactEmail = async (contactData) => {
  try {
    console.log('📨 Resend: sending contact email...');

    const { name, email, phone, company, service, message, ipAddress } = contactData;

    const data = await resend.emails.send({
      from: `Phoenix Professionals <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL],
      subject: `🎯 New Lead: ${name} - ${service}`,
      reply_to: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company || 'N/A'}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b><br/>${message}</p>
        <hr/>
        <p><small>IP: ${ipAddress || 'N/A'}</small></p>
      `,
    });

    console.log('✅ Resend success:', data?.id);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Resend error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  resend,
  sendContactEmail,
};
