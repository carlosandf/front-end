import { Container } from "@mui/material"
import Navbar from "../components/Navbar";


const Layout = (props: any) => {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Navbar />
      <Container>
        {props.children}
      </Container>
    </Container>
  );
}
export default Layout;