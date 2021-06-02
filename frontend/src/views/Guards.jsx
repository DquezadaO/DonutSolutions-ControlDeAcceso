import React, { useState, useEffect } from 'react';

// import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';

import { newGuard, getGuards } from '../services/donutApi/guards';
import Localization from '../utils/localization';
import { primaryBlue } from '../utils/styles';

export default function Guards() {
  const columns = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Número', field: 'phone' },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      try {
        const guards = await getGuards();
        setData(guards);
      } catch {}

      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Guardias"
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
                const { firstName, lastName, phone, email } = newData;
                newGuard({ firstName, lastName, phone, email }).then((res) => {
                  aux.push(newData);
                  setData(aux);
                  setLoading(false);
                });
              }, 600);
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                alert('Endpoint no implementado');
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                alert('Endpoint no implementado');
              }, 600);
            }),
        }}
      />
    </div>
  );
}
