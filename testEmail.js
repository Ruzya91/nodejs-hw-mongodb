import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendTest() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'ruzanna91@somoj.com', // или любой другой тестовый адрес
      subject: 'Тестовое письмо',
      html: '<p>Это тестовое письмо для проверки SMTP-конфигурации.</p>',
    });

    console.log('Письмо отправлено:', info.messageId);
  } catch (err) {
    console.error('Ошибка при отправке:', err);
  }
}

sendTest();
