import React, { useState } from 'react';
import { TextField } from '@mui/material/';

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