import React, { useState } from 'react';

import { TextField } from '@material-ui/core';

import { addVisit } from '../../services/donutApi/residents';
import { formInput, primaryButton } from '../../utils/styles';

function AddVisit() {
  const [visit, setVisit] = useState({
    firstName: '',
    lastName: '',
    run: '',
    licensePlate: '',
    arrivalDate: '',
  });

  function handleChange(e) {
    setVisit({ ...visit, [e.target.name]: e.target.value });
  }

  async function onSubmit() {
    if (
      !visit.firstName ||
      !visit.lastName ||
      !visit.run ||
      !visit.licensePlate ||
      !visit.arrivalDate
    ) {
      alert('Debes completar todos los campos');
      return;
    }
    await addVisit(visit);
    setVisit({ firstName: '', lastName: '', run: '', licensePlate: '', arrivalDate: '' });
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl sm:text-5xl mb-10">Agendar visita</h1>
      <div className="flex flex-col sm:flex-row">
        <input
          className={formInput + ' m-1'}
          name="firstName"
          type="text"
          placeholder="Nombre de la Visita"
          value={visit.firstName}
          onChange={(e) => handleChange(e)}
        />
        <input
          className={formInput + ' m-1'}
          name="lastName"
          type="text"
          placeholder="Apellido de la Visita"
          value={visit.lastName}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <input
          className={formInput + ' m-1'}
          name="run"
          type="text"
          placeholder="Rut de la Visita"
          value={visit.run}
          onChange={(e) => handleChange(e)}
        />
        <input
          className={formInput + ' m-1'}
          name="licensePlate"
          type="text"
          placeholder="Patente del auto"
          value={visit.licensePlate}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <TextField
          id="datetime-local"
          label="Hora de llegada"
          type="datetime-local"
          name="arrivalDate"
          onChange={(e) => handleChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <button className={primaryButton} onClick={() => onSubmit()}>
        Agendar Visita
      </button>
    </div>
  );
}

export default AddVisit;
