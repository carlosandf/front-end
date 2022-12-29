import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Layout from "./containers/Layout";
import Home from "./pages/Home";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Form />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
