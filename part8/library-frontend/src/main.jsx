import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ApolloClient,InMemoryCache,ApolloProvider,createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')

  return {
    headers:{
      ...headers,
      authorization:token ? `Bearer ${token}`:null
    }
  }
})

const httpLink = createHttpLink({
  uri:'http://localhost:4000/'
})

const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache:new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </React.StrictMode>
);
