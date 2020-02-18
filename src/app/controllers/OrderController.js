import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { recipient_id, deliveryman_id, product } = req.body;

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product
    });

    return res.json(order);
  }
}

export default new OrderController();