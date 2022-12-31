import React, {useEffect, useState} from 'react';
import {TextField, Autocomplete, Box, Button} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setAClient } from '../redux/slices/clients';
import { Link } from 'react-router-dom';

type InputValue = {id: String} | null

const SearchInput = () => {
  const [options, setOptions] = useState<Array<[]>>([]);
  const [searchValue, setSearchValue] = useState<InputValue>(null);
  const { clientsState: { clients } } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOptions((): any => {
      return clients.map((client: any) => ({ label: client.fullName, id: client.id }))
    });
  }, [clients])

  const handleSearch = () => {
    if (searchValue === null) return;

    dispatch(setAClient(searchValue.id))
  }

  return (
    <Box sx={{display: 'flex', mb: 5}}>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 400 }}
        onChange={(e, v: any) => setSearchValue(v)}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <Button
        component={Link} to="/edit-info"
        onClick={handleSearch}
        variant='outlined'
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}
export default SearchInput;
