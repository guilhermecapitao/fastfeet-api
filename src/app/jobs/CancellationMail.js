import Mail from '../../lib/Mail';

class CancellationMail {
  // é uma função que fica acessível como se fosse uma variável sem precisar chamar como método. (key)
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryman, problem } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliveryman: deliveryman.name,
        description: problem.description
      }
    });
  }
}

export default new CancellationMail();
