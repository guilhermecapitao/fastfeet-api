import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';

class Delivery {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null
      }
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const { id, deliverymanId } = req.params;

    const delivery = await Order.findByPk(id);

    /**
     * Check if delivery exists
     */
    if (!delivery) return res.json({ error: "Delivery doesn't exists" });

    /**
     * Check if delivery already be started
     */
    if (delivery.start_date)
      return res.json({ error: 'Delivery already be started' });

    const deliveriesToday = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        },
        deliveryman_id: deliverymanId
      }
    });

    /**
     * Checks whether the delivery is linked to the deliveryman
     */
    if (delivery.deliveryman_id !== Number(deliverymanId))
      return res.json({
        error: 'You cannot start a delivery that does not belong to you'
      });

    /**
     * Check if this deliveryman already finished 5 deliveries today
     */
    if (deliveriesToday >= 5)
      return res.json({ error: 'You already started 5 deliveries today' });

    await delivery.update({
      start_date: new Date()
    });

    const { product, start_date, deliveryman_id, recipient_id } = delivery;

    return res.json({
      product,
      start_date,
      deliveryman_id,
      recipient_id
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Order.findByPk(id);

    if (!delivery) return res.json({ error: 'Order not found' });

    await delivery.destroy();

    return res.status(200).json();
  }
}

export default new Delivery();
