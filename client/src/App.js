import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import Routes from "./routes";
function App() {
  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );
}

export default App;
