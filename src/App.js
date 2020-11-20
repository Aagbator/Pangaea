import AppProvider from './AppProvider';
import './scss/style.scss';
import DefaultLayout from './components/layouts/DefaultLayout';
import client from "./ApolloClient";
import Home from "./pages/Home";
import {ApolloProvider} from "@apollo/client";
import React from "react";

function App() {
  return (
      <div data-test="appComponent">
          <ApolloProvider client={client}>
              <AppProvider>
                  <DefaultLayout>
                      <Home/>
                  </DefaultLayout>
              </AppProvider>
          </ApolloProvider>
      </div>
  );
}

export default App;
