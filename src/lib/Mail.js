import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';
// Mail.js é uma classe
class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    // Transport e´como o nodemailer chama uma conexão com serviço externo
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // Verificar se existe usuario dentro do auth
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  // Sendmail metodo responsavel por enviar o email (message-recebe os dados da mensagem a enviar)
  sendMail(message) {
    return this.transporter.sendMail({
      // Anexar mensagens padrão
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
