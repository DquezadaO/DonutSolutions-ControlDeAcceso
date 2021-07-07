import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { getHistory, deleteVisit, editVisit } from '../../services/donutApi/residents';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';
import { getUserData } from '../../utils/userData';

export default function ResidentHistory() {
  const columns = [
    { title: 'Nombre', field: 'firstName', editable: false },
    { title: 'Apellido', field: 'lastName', editable: false },
    { title: 'Desde', field: 'visitSchedule.start', type: 'datetime' },
    { title: 'Hasta', field: 'visitSchedule.end', type: 'datetime' },
    { title: 'Rut', field: 'run', editable: false },
    // { title: 'Número', field: 'phone' },
    { title: 'Patente', field: 'licensePlate', editable: false },
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
        title="Visitas agendadas"
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
          onRowUpdate: async (newData, oldData) => {
            const { id } = newData;
            const { start, end } = newData.visitSchedule;

            setLoading(true);
            try {
              await editVisit(id, { scheduleStart: start, scheduleEnd: end });
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
              await deleteVisit(id);
              const aux = [...data].filter((x) => x.id !== id);
              setData(aux);
            } catch (err) {
              alert('Ocurrió un error al borrar el registro');
            }
            setLoading(false);
          },
        }}
      />
    </div>
  );
}
