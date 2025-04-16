import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ApolloContext = ({ children }) => {
    const client = React.useMemo(() => {
        return new ApolloClient({
            uri: '/graphql',
            cache: new InMemoryCache(),
        });
    });

    const location = useLocation();

    useEffect(() => {
        if (client) {
            client.cache.restore();
        }
    }, [location, client]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloContext;
