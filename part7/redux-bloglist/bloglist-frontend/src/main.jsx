import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from "./store/store";


store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
     <Provider store={store}>
     <App />
    </Provider>
  </Router>
 
);
