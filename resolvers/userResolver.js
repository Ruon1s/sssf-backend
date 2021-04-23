'use strict';

import User from '../models/Users.js'
import bcrypt from 'bcrypt'
import { login } from '../passport/authenticate.js'
import {AuthenticationError, UserInputError} from "apollo-server-errors";
export default {
    Query: {
        user: async (parent, args, {user}) => {
            console.log(user);
            return User.findById(args.id);
        },
        login: async(parent, args, {req, res}) => {
            req.body = args;
            try {
                const response = await login(req, res);
                return {
                    id: response.user.id,
                    username: response.user.username,
                    token: response.token
                };
            } catch (error){
                throw new AuthenticationError("Wrong username or password");
            }
        }
    },
    Mutation: {
        register: async (parent,args) => {
            try {
                const hash = await bcrypt.hash(args.password, 12);
                const userWithHash = {
                    ...args,
                    password: hash,
                };
                const newUser = new User(userWithHash);
                const result = await newUser.save();
                return result;
            } catch(err) {
                throw new UserInputError(err.message);
            }
        }
    }
}
