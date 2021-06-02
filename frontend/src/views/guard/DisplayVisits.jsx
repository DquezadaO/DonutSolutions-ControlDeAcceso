import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { getVisits } from '../../services/donutApi/guards';
import { formatDate } from '../../utils/datetime';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';

export default function DisplayVisits() {
  const columns = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Run', field: 'run' },
    // { title: 'Número', field: 'phone' },
    { title: 'Patente', field: 'licensePlate' },
    { title: 'Hora inicio', field: 'scheduleStart' },
    { title: 'Hora termino', field: 'scheduleEnd' },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      try {
        const visists = await getVisits();
        const formattedVisits = visists.map((visit) => ({
          firstName: visit.firstName,
          lastName: visit.lastName,
          run: visit.run,
          phone: visit.phone,
          licensePlate: visit.licensePlate,
          scheduleStart: formatDate(visit.visitSchedule.start),
          scheduleEnd: formatDate(visit.visitSchedule.end),
        }));
        setData(formattedVisits);
      } catch {}

      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Visitas"
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
