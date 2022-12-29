import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Layout from "./containers/Layout";
import ClientsViewer from "./pages/ClientsViewer";

const App = () => {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ClientsViewer />} />
          <Route path="/create-client" element={<Form />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
