import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { getEntries } from '../../services/donutApi/guards';
import { formatDate } from '../../utils/datetime';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';

export default function DisplayEntries() {
  const columns = [
    { title: 'Tipo', field: 'type' },
    { title: 'Unidad a la que se dirige', field: 'unitNumber' },
    { title: 'Fecha', field: 'entryTimestamp' },
    { title: 'Ingreso con detección de patente', field: 'plateWasDetected' },
    { title: 'Patente Detectada', field: 'licensePlate' },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      try {
        const entries = await getEntries();
        const formattedEntries = entries.map((entry) => {
          const licensePlate = entry.licensePlate || entry.visit.licensePlate;
          return {
            type: entry.type === 'visit' ? 'visita' : 'residente',
            unitNumber: entry.unit.number,
            entryTimestamp: formatDate(entry.entryTimestamp),
            licensePlate: entry.manual ? 'N/A' : licensePlate,
            plateWasDetected: entry.manual ? 'No' : 'Si',
          };
        });
        setData(formattedEntries);
      } catch {}

      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Historial Ingresos"
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
