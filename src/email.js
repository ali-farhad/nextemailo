
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.NEXT_PUBLIC_SG_emailo);

module.exports = class Email {
  constructor(email, url) {
    this.to = email;
    this.url = url;
    this.fromEmail = 'alifarhad557@gmail.com';
    this.fromName = 'emailo';
  }

  async sendCSVLink() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      templateId: 'd-0458dd1de21f4687bfa07648e6bdcc56',
      dynamic_template_data: {

        email_address: this.to,
        action_url: this.url,
      },
    };

    await sgMail.send(mailOptions).then(() => {}, console.error);
  }
};