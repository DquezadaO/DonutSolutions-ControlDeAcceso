import React, { useState } from 'react';

function handleSubmit(firstName, lastName, RUT, plate) {
  alert(`${firstName}, ${lastName}, ${RUT}, ${plate}`);
}

function handleChange(state, setState, e) {
  setState({ ...state, [e.target.name]: e.target.value });
}

export default function RegisterCarForm() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    run: '',
    licensePlate: '',
  });
  return (
    <form onSubmit={(x) => handleSubmit(state)}>
      <label>
        Nombre:
        <input
          type="text"
          value={state.firstName}
          onChange={(e) => handleChange(state, setState, e)}
        />
      </label>
      <label>
        Apellido:
        <input
          type="text"
          value={state.lastName}
          onChange={(e) => handleChange(state, setState, e)}
        />
      </label>
      <label>
        RUT:
        <input type="text" value={state.run} onChange={(e) => handleChange(state, setState, e)} />
      </label>
      <label>
        Patente:
        <input
          type="text"
          value={state.licensePlate}
          onChange={(e) => handleChange(state, setState, e)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
