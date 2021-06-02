import React, { useEffect, useState } from 'react';

import { getUserData } from '../../utils/userData';
import BackofficeMenu from './components/Backoffice';
import GuardMenu from './components/Guard';
import ResidentMenu from './components/Resident';

function UserMenu() {
  const [role, setRole] = useState('residente');

  useEffect(() => {
    async function fetchMyAPI() {
      const userData = await getUserData();
      setRole(userData.role);
    }

    fetchMyAPI();
  }, []);

  if (role === 'residente') return <ResidentMenu />;
  if (role === 'guardia') return <GuardMenu />;
  return <BackofficeMenu />;
}

export default UserMenu;
