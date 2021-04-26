'use strict';
import fs from 'fs';
import path from 'path';
import Entries from '../models/Entries.js'

export default {
    Query: {
        entries: async (parent, args) => {
            return Entries.find();
        },
        entriesByUser: async (parent, args) => {
            console.log('EntriesbyUserID', args);
            return Entries.find().where('userID').equals(args.id);
        }
    },

    Mutation: {
        addEntry: async (parent, args, {user}) => {
            //loading image to the server
    /*        if(!user) {
                throw new AuthenticationError('You have not logged in')
            } */
            try {
                console.log('addEntry args', args);
                console.log(await args.File.File);
                let {filename, createReadStream} = await args.File.File;
                console.log(filename);
                const stream = createReadStream();
                const pathName = path.join(`C://Users/Mikael/Native/sssf-backend/uploads/${filename}`);
                console.log('pathname', pathName);
                await stream.pipe(fs.createWriteStream(pathName));
                const photourl = {
                    url: `http://localhost:8000/uploads/${filename}`
                };
                let entry = {...args, File: photourl.url};
                let newEntry = new Entries(entry);
                const rslt = await newEntry.save();
                return rslt;
            }catch(e){

            }


        },
        modifyEntry: async (parent, args, {user}) => {
            console.log('dostuff');
        },
        deleteEntry: async (parent, args, {user}) => {
            console.log('dostuff');
        }

    }

}
