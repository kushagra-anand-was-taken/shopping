import React, { useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./action/auth";
import Routes from "./routes";
function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );
}

export default App;
