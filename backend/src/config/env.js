// non database env config
import dotenv from 'dotenv';

dotenv.config();

const configEnv = {
  SECRET_KEY: process.env.SECRET_KEY,
};

export default configEnv;
