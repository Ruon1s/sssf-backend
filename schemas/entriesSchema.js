'use strict';

import {gql} from 'apollo-server-express';


export default gql`
    extend type Query {
    entries(): [Entry],
    entriesByUser(id: ID!): [Station]
    }
    
    type Entry {
        id: ID
        Entryname: String
        Image: Image
        Ingredients: String
        Steps: String
        Rating: Int
        Date: Date
        userID: ID
    }
    
    extend type Mutation{
    deleteEntry(id: ID!): Entry
    addEntry(
        Entryname: String
        Image: Image
        Ingredients: String
        Steps: String
        Rating: Int
        Date: Date
        userID: ID
        ): Entry
    modifyEntry(
        Entryname: String
        Image: Image
        Ingredients: String
        Steps: String
        Rating: Int
    ): Entry    
    }


    extend type Mutation {
    deleteStation(id: ID!): Station
    addStation(
    Connections: [Connections]
    Postcode: String
    Title: String
    AddressLine1: String
    StateOrProvince: String
    Town: String
    Location: newLocation
    ): Station
    }
    
`
