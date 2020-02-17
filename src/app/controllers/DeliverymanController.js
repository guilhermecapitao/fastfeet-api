import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists)
      return res.status(400).json({ error: 'User already exists' });

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { id } = req.params;
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    /**
     *  Verify if user mail already exists, except the current user mail
     */
    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists)
        return res.status(400).json({ error: 'User already exists' });
    }

    const { name } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman)
      return res.status(400).json({ error: "This user don't exists" });

    await deliveryman.destroy();

    return res.status(200).json();
  }
}

export default new DeliverymanController();
