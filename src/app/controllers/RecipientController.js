import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { name, address } = req.body;

    const { street, house_number, complement, state, city, zip_code } = address;

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
