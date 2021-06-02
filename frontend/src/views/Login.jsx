import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { login } from '../services/donutApi/auth';
import { formInput, primaryButton } from '../utils/styles';
import { getUserData } from '../utils/userData';

const defaultRoutes = {
  residente: '/app/residente/add-visit',
  guardia: '/app/guardia',
  backoffice: '/app/backoffice/display-residents',
};

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function onSubmit() {
    const response = await login(user);
    if (response) {
      const userData = await getUserData();
      history.push(defaultRoutes[userData.role]);
    }
    setUser({ email: '', password: '' });
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white text-4xl sm:text-5xl mb-10">Control de Acceso</h1>
      <div className="flex flex-col w-100">
        <input
          className={formInput}
          name="email"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          className={formInput}
          name="password"
          type="password"
          placeholder="contraseña"
          value={user.password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button className={primaryButton} onClick={onSubmit}>
        Ingresar
      </button>
    </div>
  );
}

export default Login;
