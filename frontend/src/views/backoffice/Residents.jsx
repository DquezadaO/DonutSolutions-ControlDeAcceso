import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { getUnits, deleteResident, editResident } from '../../services/donutApi/backoffice';
import { newResident, getResidents } from '../../services/donutApi/residents';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';

const customLocalization = { ...Localization };
customLocalization.grouping.placeholder = 'Arrastra la Unidad para agrupar...';
const defaultColumns = [
  { title: 'Nombre', field: 'firstName', grouping: false },
  { title: 'Apellido', field: 'lastName', grouping: false },
  { title: 'Email', field: 'email', grouping: false },
  { title: 'Número', field: 'phone', grouping: false },
  { title: 'Unidad', field: 'idUnit' },
];

export default function Residents() {
  const [columns, setColumns] = useState(defaultColumns);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLookup = (units) => {
    const aux = {};
    for (let i = 1; i < units.length; i++) {
      const unit = units[i];
      aux[unit.id] = unit.number;
    }
    return aux;
  };

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      try {
        const residents = await getResidents();
        const units = await getUnits();
        const newColumns = [
          { title: 'Nombre', field: 'firstName', grouping: false },
          { title: 'Apellido', field: 'lastName', grouping: false },
          { title: 'Email', field: 'email', grouping: false },
          { title: 'Número', field: 'phone', grouping: false },
          { title: 'Unidad', field: 'unitId', lookup: getLookup(units.units) },
        ];
        setColumns(newColumns);
        setData(residents);
      } catch {}

      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Residentes"
        isLoading={loading}
        columns={columns}
        data={data}
        options={{
          headerStyle: {
            backgroundColor: primaryBlue,
            color: '#FFF',
          },
          actionsColumnIndex: -1,
          grouping: true,
        }}
        localization={customLocalization}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const aux = [...data];
                setLoading(true);
                const { firstName, lastName, phone, email, unitId } = newData;
                newResident({ firstName, lastName, phone, email, unitId }).then((res) => {
                  aux.push(newData);
                  setData(aux);
                  setLoading(false);
                });
              }, 600);
            }),
          onRowUpdate: async (newData, oldData) => {
            const { id, firstName, lastName, email, phone } = newData;

            setLoading(true);
            try {
              await editResident(id, { firstName, lastName, email, phone });
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
            } catch {
              alert('Ocurrió un error al editar el registro');
            }
            setLoading(false);
          },
          onRowDelete: async (oldData) => {
            const { id } = oldData;
            setLoading(true);
            try {
              await deleteResident(id);
              const aux = [...data].filter((x) => x.id !== id);
              setData(aux);
            } catch {
              alert('Ocurrió un error al borrar el registro');
            }
            setLoading(false);
          },
        }}
      />
    </div>
  );
}
