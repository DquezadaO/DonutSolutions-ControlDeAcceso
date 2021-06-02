import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { getUnits } from '../../services/donutApi/backoffice';
import { getResidents } from '../../services/donutApi/residents';
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
      />
    </div>
  );
}
