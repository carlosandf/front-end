import Container from '@mui/material/Container';
import ClientsTable from '../containers/ClientsTable';
import SearchInput from '../components/SearchInput';

const Home = () => {

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <SearchInput />
      <ClientsTable />
    </Container>
  )
}

export default Home;