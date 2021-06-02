import jwt from 'jsonwebtoken';

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7, authorization.length);
      const payload = jwt.verify(token, req.app.locals.env.SECRET_KEY);
      res.locals.role = payload.role;
      res.locals.userId = payload.id;
      res.locals.getUser = async (attributes = ['id', 'role']) =>
        await res.app.locals.orm.user.findOne({
          where: { id: payload.id },
          attributes: attributes,
        });
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    const error = {
      error: 'Unauthorized',
      message: 'The authentication failed',
    };
    return res.status(401).send(error);
  }
};

export default validateToken;
