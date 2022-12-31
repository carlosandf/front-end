import { useAppSelector } from '../hooks/redux';
import { Container } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Box, Button } from '@mui/material/';
import { useAppDispatch } from '../hooks/redux';
import { setClients } from '../redux/slices/clients';
import AlertMessage from '../components/AlertMessage';

const URL = import.meta.env.VITE_API_URL;

const EditInfo: React.FC = () => {
  const { clientsState: { client } } = useAppSelector((state) => state);
  const [inputValue, setInputValue] = useState({});
  const [message, setMessage] = useState<any>(null);
  const dispatch = useAppDispatch();

  const handleChangeInput = (event:any, inputName:any) => {
    const { target: {value}} = event;
    setInputValue({
      ...inputValue,
      [inputName]: value
    });
  }


  const handleSubmit = () => {
    axios.put(`${URL}/${client.id}`, inputValue)
      .then(res => {
        dispatch(setClients([res.data]));
        setInputValue(inputValue);
        setMessage(AlertMessage({message: "se actualizo correctamente", severity: "success"}));
      })
      .catch(() => {
        setMessage(AlertMessage({
          message: "Ups :( Hubo un error",
          severity: "error"
        }))
      })

    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      style={{
        display: "grid",
        gap: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      {message}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 300px)",
        gap: 15,
        justifyItems: "center",
        justifyContent: "center"
      }}>
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          placeholder="Nombre"
          defaultValue={client.firstName}
          onChange={(e) => handleChangeInput(e, "firstName")}
        />
        <TextField
          required
          id="outlined-required"
          label="Apellido"
          placeholder="Apellido"
          defaultValue={client.lastname}
          onChange={(e) => handleChangeInput(e, "lastname")}
        />
        <TextField
          required
          id="outlined-number"
          label="Identificación"
          type="number"
          defaultValue={client.identification}
          onChange={(e) => handleChangeInput(e, "identification")}
        />
        <TextField
          required
          id="outlined-required"
          label="Dirección"
          placeholder="Dirección"
          name="address"
          defaultValue={client.address}
          onChange={(e) => handleChangeInput(e, "address")}
        />
        <TextField
          required
          id="outlined-number"
          label="Celular"
          type="number"
          name="phone"
          defaultValue={client.phone}
          onChange={(e) => handleChangeInput(e, "phone")}
        />
      </div>
      <Button
        sx={{width: "95%", maxWidth: 400, margin: "auto"}}
        onClick={handleSubmit}
        variant="contained"
      >
        Guardar
      </Button>
    </Box>
  );
}

export default EditInfo;