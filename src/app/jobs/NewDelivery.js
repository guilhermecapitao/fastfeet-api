import Mail from '../../lib/Mail';

class NewDelivery {
  // é uma função que fica acessível como se fosse uma variável sem precisar chamar como método. (key)
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    const { deliveryman, recipient, address, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'newdelivery',
      context: {
        deliveryman: deliveryman.name,
        address,
        recipient: recipient.name,
        product
      }
    });
  }
}

export default new NewDelivery();
