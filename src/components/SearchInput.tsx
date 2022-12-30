import React, {useEffect, useState} from 'react';
import {TextField, Autocomplete} from '@mui/material/';
import { useAppSelector } from '../hooks/redux';

const SearchInput = () => {
  const [options, setOptions] = useState([]);
  const { clientsState: { clients } } = useAppSelector((state) => state);

  useEffect(() => {
    setOptions((): any => {
      return clients.map((client: any) => ({ label: client.fullName }))
    });
  }, [clients])

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 400, marginBottom: "50px" }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}
export default SearchInput;
