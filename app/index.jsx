import React from "react";
import configureStore from "./store";
import { Provider } from "react-redux";


import Home from "./Home";

export default function Index() {
return (
    <Provider store={configureStore()}>
      <Home/>
    </Provider>
  );
}

