import { post } from '../../utils/requests';
import { setCookie } from '../../utils/session';

export async function login(user) {
  try {
    const { email, password } = user;
    const response = await post('public/login', { email, password });
    const { accessToken } = response.data.data;
    await setCookie('token', accessToken);
    return true;
  } catch (error) {
    console.error(error);
    alert('No fue posible iniciar sesión, intentelo nuevamente.');
  }
}
