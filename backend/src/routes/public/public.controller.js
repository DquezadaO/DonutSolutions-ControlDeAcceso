import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//=
// Post
//=
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await res.app.locals.orm.user.findOne({
    where: { email },
    attributes: ['id', 'role', 'password'],
  });
  if (!user) {
    return res
      .status(401)
      .send({ error: 'authentication-error', message: 'Invalid username or password' });
  }

  // Check if password is valid
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res
      .status(401)
      .send({ error: 'authentication-error', message: 'Invalid username or password' });
  }

  // Sign token
  const secretKey = req.app.locals.env.SECRET_KEY;
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '7d' });

  const response = {
    data: {
      accessToken: token,
    },
  };
  return res.status(200).send(response);
};
