import { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Button } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Client, setAClient } from '../redux/slices/clients';
import { useNavigate } from 'react-router-dom';

type InputValue = {id: String} | null

const SearchInput = () => {
  const [options, setOptions] = useState<Array<[]>>([]);
  const [searchValue, setSearchValue] = useState<InputValue>(null);
  const { clientsState: { clients } } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOptions((): any => {
      return clients.map((client: Client) => ({ label: client.fullName, id: client.id }))
    });
  }, [clients])

  const handleSearch = () => {
    if (searchValue === null) return;

    dispatch(setAClient(searchValue.id));
    navigate(`/edit-info/${searchValue.id}`);
  }

  return (
    <Box sx={{display: 'flex', mb: 5, width: '100%', justifyContent: 'center'}}>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: '100%', maxWidth: '400px' }}
        onChange={(e, v: any) => setSearchValue(v)}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <Button
        onClick={handleSearch}
        disabled={searchValue === null ? true : false}
        variant='outlined'
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}
export default SearchInput;
