import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import { newCar, getCars, getUnits, deleteCar, editCar } from '../../services/donutApi/backoffice';
import Localization from '../../utils/localization';
import { primaryBlue } from '../../utils/styles';

const defaultColumns = [
  { title: 'Patente', field: 'licensePlate' },
  { title: 'Marca', field: 'carBrand' },
  { title: 'Modelo', field: 'carModel' },
  { title: 'Color', field: 'carColor' },
  { title: 'Unidad', field: 'unitId' },
];

export default function Cars() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(defaultColumns);

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
        const precars = await getCars();
        const cars = precars.filter((c) => c.unitId !== 1);
        const units = await getUnits();
        const newColumns = [
          { title: 'Patente', field: 'licensePlate' },
          { title: 'Marca', field: 'carBrand' },
          { title: 'Modelo', field: 'carModel' },
          { title: 'Color', field: 'carColor' },
          { title: 'Unidad', field: 'unitId', lookup: getLookup(units.units) },
        ];
        setColumns(newColumns);
        setData(cars);
      } catch {}

      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  // const updateData = (data) => {};
  return (
    <div className="shadow-2xl border ">
      <MaterialTable
        title="Vehículos"
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
                newCar(newData).then((res) => {
                  aux.push(newData);
                  setData(aux);
                  setLoading(false);
                });
              }, 600);
            }),
          onRowUpdate: async (newData, oldData) => {
            const { unitId, licensePlate, carBrand, carModel, carColor } = newData;

            setLoading(true);
            try {
              await editCar({ unitId, licensePlate, carBrand, carModel, carColor });
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
            const { id, licensePlate } = oldData;
            setLoading(true);
            try {
              await deleteCar({ licensePlate });
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
