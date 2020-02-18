import User from '../models/User';

export default async (req, res, next) => {
  const id = req.userId;

  const user = await User.findOne({
    where: { id }
  });

  if (!user)
    return res.status(401).json({ error: 'You are not allowed to do this' });

  return next();
};
