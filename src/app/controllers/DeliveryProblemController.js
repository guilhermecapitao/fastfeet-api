import * as Yup from 'yup';

import Problem from '../models/Problem';
import Order from '../models/Order';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;
    let problems = [];

    if (id) {
      problems = await Problem.findAll({
        where: { order_id: id }
      });
    } else {
      problems = await Problem.findAll();
    }

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.json({ error: 'Validation fails' });

    const { description } = req.body;
    const { id } = req.params;

    const problem = await Problem.create({
      description,
      order_id: id
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await Problem.findByPk(id);

    await Order.destroy({
      where: {
        id: problem.order_id
      }
    });

    return res.json();
  }
}

export default new DeliveryProblemController();
