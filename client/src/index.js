import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
serviceWorker.unregister();
