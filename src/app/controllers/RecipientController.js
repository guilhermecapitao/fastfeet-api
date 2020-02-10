import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { name, address } = req.body;

    const { street, house_number, complement, state, city, zip_code } = address;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.object().shape({
        street: Yup.string().required(),
        house_number: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        zip_code: Yup.string()
          .required()
          .min(8)
      })
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const recipient = await Recipient.create({
      name,
      street,
      house_number,
      complement,
      state,
      city,
      zip_code
    });

    return res.json(recipient);
  }
}

export default new RecipientController();
