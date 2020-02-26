import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class DeliveriedController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    /**
     * Check if deliveryman exists
     */

    if (!deliveryman) return res.json({ error: "Deliveryman doesn't exists" });

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: id
      }
    });

    const deliveriesDone = deliveries.filter(
      delivery => delivery.end_date !== null
    );

    return res.json(deliveriesDone);
  }

  /**
   * Finish Delivery
   */
  async update(req, res) {
    const { id, deliverymanId } = req.params;

    const delivery = await Order.findByPk(id);

    /**
     * Check if delivery exists
     */
    if (!delivery) return res.json({ error: "Delivery doesn't exists" });

    /**
     * Checks whether the delivery is linked to the deliveryman
     */
    if (delivery.deliveryman_id !== Number(deliverymanId))
      return res.json({
        error: 'You cannot complete a delivery that does not belong to you'
      });

    /**
     * Check if delivery have been started
     */
    if (delivery.start_date === null)
      return res.json({ error: 'Delivery has not been started' });

    /**
     * Check if delivery already been finished
     */
    if (delivery.end_date !== null)
      return res.json({ error: 'Delivery has been already finished' });

    // Upload de arquivo aqui posteriormente

    await delivery.update({
      end_date: new Date()
    });

    return res.json(delivery);
  }
}

export default new DeliveriedController();
