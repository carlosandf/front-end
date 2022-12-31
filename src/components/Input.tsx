import React, { useState } from 'react';
import { TextField } from '@mui/material/';

/*
  ESTE COMPONENTE NO ESTÁ TERMINADO,
  POR ENDE, NO ESTA SIENDO UTILIZADO AÚN.
*/
const Input = (props: any) => {

  const {value, handleChangeInput} = props;

  return (
    <TextField
      required
      id="outlined-required"
      label="Nombre"
      placeholder="Nombre"
      value={value}
      onChange={(e) => handleChangeInput(e, "firstName")}
    />
  )
}

export default Input;