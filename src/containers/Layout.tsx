import React from "react";
import { Container } from "@mui/material"
import Navbar from "../components/Navbar";

const Layout = (props: any) => {
  return (
    <Container>
      <Navbar />
      <Container>
        {props.children}
      </Container>
    </Container>
  );
}
export default Layout;