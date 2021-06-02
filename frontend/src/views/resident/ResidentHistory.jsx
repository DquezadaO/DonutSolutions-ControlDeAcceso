import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { getHistory } from '../../services/donutApi/residents';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';
import { getUserData } from '../../utils/userData';

export default function ResidentHistory() {
  const columns = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Rut', field: 'run' },
    // { title: 'Número', field: 'phone' },
    { title: 'Patente', field: 'licensePlate' },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      const userData = await getUserData();
      try {
        const visits = await getHistory(userData.id);
        setData(visits.data);
      } catch {}

      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Historial Visitas"
        isLoading={loading}
        columns={columns}
        data={data}
        options={{
          headerStyle: {
            backgroundColor: primaryBlue,
            color: '#FFF',
          },
          actionsColumnIndex: -1,
        }}
        localization={Localization}
      />
    </div>
  );
}
