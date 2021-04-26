'use strict';
import {gql} from 'apollo-server-express';


export default gql`

    type Entry {
        id: ID
        Entryname: String
        File: String
        Ingredients: String
        Steps: String
        Rating: Int
        Date: Float
        userID: String
    }
    
    
    extend type Query {
    entries: [Entry]
    entriesByUser(id: String): [Entry]
    }
    
    input Image {
    File: Upload!
    }
    
    extend type Mutation {  
    deleteEntry(id: ID!): Entry
    addEntry(
        Entryname: String
        File: Image
        Ingredients: String
        Steps: String
        Rating: Int
        Date: Float
        userID: String
        ): Entry
        
    modifyEntry(
        Entryname: String
        File: Upload!
        Ingredients: String
        Steps: String
        Rating: Int
    ): Entry
    
    }
    
`
