import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import NewDelivery from '../jobs/NewDelivery';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { recipient_id, deliveryman_id, product } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) return res.json({ error: "Deliveryman doesn't exists" });

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) return res.json({ error: "Recipient doesn't exists" });

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product
    });

    const address = `${recipient.street}, ${recipient.city}, ${recipient.state}`;

    await Queue.add(NewDelivery.key, {
      deliveryman,
      address,
      product,
      recipient
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number(),
      product: Yup.string()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id } = req.params;

    const order = await Order.findByPk(id);

    await order.update(req.body);

    return res.json(order);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order)
      return res.status(400).json({ error: "This order doesn't exist" });

    await order.destroy();

    return res.status(200).json();
  }
}

export default new OrderController();
