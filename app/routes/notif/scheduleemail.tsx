import { redirect } from "remix";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const msgService = process.env.TWILIO_MSG_SERVICE;
const gmailPass = process.env.GMAIL_PASS;
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const setCron = (bday: string, dBefore: string) => {
  const trimBday = bday.slice(0, bday.length - 3)
  let month = Number(trimBday.split("/")[0])
  const day = Number(trimBday.split("/")[1])
  const dayOfEmail = (day - Number(dBefore))

  if (dayOfEmail < 0) {
    month--
    const daysOfMonth = new Date(2025, month, 0).getDate()
    const newDay = (daysOfMonth - Math.abs(dayOfEmail))
    return `0 8 ${newDay} ${month} *` 
  } else {
    return `0 8 ${dayOfEmail} ${month} *`
  }
}

export const action = async ({ request } : { request: any }) => {
  const form = await request.formData();
  
  // Pull values from notification modal
  const name = form.get('name');
  const daysBefore = form.get('days-before');
  const bday = form.get('bday')
  // TODO: validate email input:
  const email = form.get('email')

  // Configure date for email cron job
  const cronString = setCron(bday, daysBefore)
  
  // Setup transport for nodemailer
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'thebdayapp@gmail.com',
      pass: gmailPass,
    },
  });

  // Schedule cron job for this birthday
  cron.schedule(cronString, async () => {
    
    let info = await transporter.sendMail({
      from: 'thebdayapp@gmail.com',
      to: email,
      subject: `Birthday reminder for ${name}!`,
      text: `${name}'s birthday is in ${daysBefore} days!`,
      html: `<b>${name}'s birthday is in ${daysBefore} days!</b>`,
    }, (err: Error) => console.log(err));
    console.log({ info });
  })

  return redirect("/");
};

