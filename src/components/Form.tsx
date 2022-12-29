import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Box, Button } from '@mui/material/';

const INITIAL_INPUTS_STATE = {
  firstName: "",
  lastname: "",
  identification: "",
  address: "",
  phone: ""
}

const URL = import.meta.env.VITE_API_URL;

const  Form: React.FC = () => {
  const [inputValue, setInputValue] = useState(INITIAL_INPUTS_STATE);

  const handleChangeInput = (event:any, inputName:any) => {
    const { target: {value}} = event;
    setInputValue({
      ...inputValue,
      [inputName]: value
    });
  }

  const isCompleted = () => {
    const values = Object.values(inputValue)
    return values.every(value => value.length > 0)
  }

  const handleSubmit = () => {
    axios.post(URL, inputValue)
      .then(res => {
        console.log(res)
        setInputValue(INITIAL_INPUTS_STATE);
      })
      .catch(() => alert('En numero de identificación ya se encuentra registrado'))
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      style={{
        display: "grid",
        placeContent: "center",
        gap: "20px"
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{
        display: "grid",
        placeItems: "center"
      }}>
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          placeholder="Nombre"
          value={inputValue.firstName}
          onChange={(e) => handleChangeInput(e, "firstName")}
        />
        <TextField
          required
          id="outlined-required"
          label="Apellido"
          placeholder="Apellido"
          value={inputValue.lastname}
          onChange={(e) => handleChangeInput(e, "lastname")}
        />
        <TextField
          required
          id="outlined-number"
          label="Identificación"
          type="number"
          value={inputValue.identification}
          onChange={(e) => handleChangeInput(e, "identification")}
        />
        <TextField
          required
          id="outlined-required"
          label="Dirección"
          placeholder="Dirección"
          name="address"
          value={inputValue.address}
          onChange={(e) => handleChangeInput(e, "address")}
        />
        <TextField
          required
          id="outlined-number"
          label="Celular"
          type="number"
          name="phone"
          value={inputValue.phone}
          onChange={(e) => handleChangeInput(e, "phone")}
        />
      </div>
      <Button disabled={!isCompleted()} onClick={handleSubmit} variant="contained">Guardar</Button>
    </Box>
  );
}

export default Form