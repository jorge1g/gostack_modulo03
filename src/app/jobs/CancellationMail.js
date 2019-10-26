import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get Key() {
    // Retornando uma chave unica co o mesmo nome da classe
    return 'CancellationMail';
  }

  // Desestruturar o data do handle
  async handle({ data }) {
    // Neste data vai chegar todas as informações de envio de email
    const { appointment } = data;

    // eslint-disable-next-line no-console
    console.log('A fila executou');

    await Mail.sendMail({
      // As informações appointment vem de dentro do handle
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', as' H:mm' h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
