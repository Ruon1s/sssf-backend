'use strict';

import usersSchema from "./usersSchema.js";
import entriesSchema from "./entriesSchema.js";
import {gql} from 'apollo-server-express';

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

export default [
    entriesSchema,
    linkSchema,
    usersSchema,
];
