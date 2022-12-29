import React, {useEffect, useState} from 'react';
import {TextField, Autocomplete} from '@mui/material/';

const Input = (props: any) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(res => res.json())
      .then(data => {
        const list = data.map((client: any) => ({ label: client.fullName }))
        setOptions(list)
      })
  }, [])

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 400, marginBottom: "50px" }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}
export default Input;
