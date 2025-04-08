import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';

const ApolloContext = ({ children }) => {

    const client = React.useMemo(() => {
        return new ApolloClient({
            uri: '/graphql',
            cache: new InMemoryCache(),
        });
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}

export default ApolloContext;
