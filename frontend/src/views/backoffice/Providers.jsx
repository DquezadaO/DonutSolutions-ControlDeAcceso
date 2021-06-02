import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { newProvider, getProviders } from '../../services/donutApi/backoffice';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';

export default function Providers() {
  const columns = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Run', field: 'run' },
    { title: 'Número', field: 'phone' },
    { title: 'Patente', field: 'licensePlate' },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      const providers = await getProviders();
      setData(providers);
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Provedores"
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
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const aux = [...data];
                setLoading(true);
                newProvider(newData).then((res) => {
                  aux.push(newData);
                  setData(aux);
                  setLoading(false);
                });
              }, 600);
            }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve) => {
          //     setTimeout(() => {
          //       resolve();
          //       alert('Endpoint no implementado');
          //     }, 600);
          //   }),
        }}
      />
    </div>
  );
}
