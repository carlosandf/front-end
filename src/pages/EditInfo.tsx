import { useAppSelector } from '../hooks/redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Box, Button, Typography } from '@mui/material/';
import { useAppDispatch } from '../hooks/redux';
import { Client, setClients } from '../redux/slices/clients';
import AlertMessage from '../components/AlertMessage';

const URL = import.meta.env.VITE_API_URL;

const EditInfo: React.FC = () => {
  const { clientsState: { client } } = useAppSelector((state) => state);
  const [inputValue, setInputValue] = useState<Client>({...client});
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
      <Typography id="modal-modal-title" variant="h5" component="h3" sx={{ mb: 3 }}>
        Editar Información
      </Typography>

      { message }

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 300px)",
        gap: 15,
        justifyItems: "center",
        justifyContent: "center",
        marginTop: 50
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