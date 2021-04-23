'use strict';

import { gql } from "apollo-server-express";

export default gql`
    type User {
        username: String!
        id: ID!
        token: String
    }
    
    extend type Query {
        user(id: ID!): User
        login(
            username: String!,
            password: String!
            ): User
    }
    
    extend type Mutation {
        register(
            username: String!,
            password: String!
            ): User
    }
`;
