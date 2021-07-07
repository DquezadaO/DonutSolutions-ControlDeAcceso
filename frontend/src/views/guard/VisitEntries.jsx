import React, { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import { getUnits } from '../../services/donutApi/backoffice';
import { registerEntry } from '../../services/donutApi/guards';
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

export default function RegisterEntry() {
  const classes = useStyles();
  const [visit, setVisit] = useState({
    firstName: '',
    lastName: '',
    run: '',
    phone: '', // optional
    licensePlate: '', // optional
    unitId: 1,
  });

  const [units, setUnits] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const data = await getUnits();
        setUnits(data.units);
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
    if (!visit.firstName || !visit.lastName || !visit.run || !visit.unitId) {
      alert('Debes completar todos los campos');
      return;
    }
    await registerEntry({ unitId: visit.unitId, type: 'visit', visit });
    setVisit({
      firstName: '',
      lastName: '',
      run: '',
      licensePlate: '',
      phone: '',
      unitId: 1,
    });
  }
  return (
    <div className="flex flex-col justify-left items-center">
      <h1 className="text-4xl sm:text-5xl mb-10">Registrar ingreso de visita</h1>
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
      <div className="flex flex-col sm:flex-row">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Unidad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={visit.unitId}
            name="unitId"
            onChange={(e) => handleChange(e)}
          >
            {units.map((u) => (
              <MenuItem key={u.id} value={u.id}>{`${u.number}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <button className={primaryButton} onClick={() => onSubmit()}>
        Registrar Ingreso
      </button>
    </div>
  );
}
