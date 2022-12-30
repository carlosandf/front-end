import Container from '@mui/material/Container';
import ClientsTable from '../components/ClientsTable';
import SearchInput from '../components/SearchInput';
import UpdateModal from '../components/ModalInfo';

const Home = () => {

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <SearchInput />
      <ClientsTable />
      <UpdateModal />
    </Container>
  )
}

export default Home;