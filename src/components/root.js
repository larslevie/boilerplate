import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      return false;
    });
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onErrorLink,
    new HttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
});

const query = gql`
  query rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;

const ExchangeRates = ({ srcCurrency }) => (
  <Query
    query={query}
    skip={!srcCurrency}
    variables={{ currency: srcCurrency }}
    notifyOnNetworkStatusChange
    delay
  >
    {({ loading, error, data, networkStatus, load }) => {
      if (networkStatus === 4) console.log('refetching');
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div>
          <button onClick={() => load()}>Fetch!</button>
          {data.rates.map(({ currency, rate }) => (
            <div key={currency}>
              <p>{`${currency}: ${rate}`}</p>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

ExchangeRates.propTypes = { srcCurrency: PropTypes.string };
ExchangeRates.defaultProps = { srcCurrency: null };

const render = () => (
  <ApolloProvider client={client}>
    <div>
      <ExchangeRates srcCurrency="GBP" />
    </div>
  </ApolloProvider>
);

const Root = props => render(props);

export default Root;
