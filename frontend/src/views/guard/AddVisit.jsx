import React, { useState, useEffect } from 'react';

import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import { addVisit } from '../../services/donutApi/guards';
import { getResidents } from '../../services/donutApi/residents';
import { formInput, primaryButton } from '../../utils/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddVisit() {
  const classes = useStyles();
  const [visit, setVisit] = useState({
    firstName: '',
    lastName: '',
    run: '',
    licensePlate: '',
    arrivalDate: '',
    residentId: '',
  });

  const [residents, setResidents] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const residents = await getResidents();
        setResidents(residents);
      } catch {}
    }

    fetchMyAPI();
  }, []);

  function handleChange(e) {
    setVisit({ ...visit, [e.target.name]: e.target.value });
  }

  //   function getName(rid) {
  //     try {
  //       console.error('R', residents);
  //       const resident = residents.filter((r) => r.id === rid)[0];
  //       return `${resident.firstName} ${resident.lastName}`;
  //     } catch {
  //       return '';
  //     }
  //   }

  async function onSubmit() {
    if (
      !visit.firstName ||
      !visit.lastName ||
      !visit.run ||
      !visit.licensePlate ||
      !visit.arrivalDate ||
      !visit.residentId
    ) {
      alert('Debes completar todos los campos');
      return;
    }
    await addVisit(visit);
    setVisit({
      firstName: '',
      lastName: '',
      run: '',
      licensePlate: '',
      arrivalDate: '',
      residentId: '',
      phone: '',

    });
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

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Residente</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={visit.residentId}
            name="residentId"
            onChange={(e) => handleChange(e)}
          >
            {residents.map((r) => (
              <MenuItem key={r.id} value={r.id}>{`${r.firstName} ${r.lastName}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
