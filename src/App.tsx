import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./containers/Form";
import EditInfo from "./pages/EditInfo";
import Layout from "./containers/Layout";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Form />} />
            <Route path="/edit-info" element={<EditInfo />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
