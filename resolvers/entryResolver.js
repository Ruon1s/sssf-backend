'use strict';
import fs from 'fs';
import path from 'path';
import Entries from '../models/Entries.js'
import {AuthenticationError} from "apollo-server-errors";

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
           if (!user) {
                throw new AuthenticationError('You have not logged in')
            }

            try {
                if (!args.File) {
                    let entry = args;
                    let newEntry = new Entries(entry);
                    const rslt = await newEntry.save();
                    return rslt;
                } else {
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
                }
            } catch (e) {

            }


        },
        modifyEntry: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError('You have not logged in')
            }

            try {
                if(!args.File){
                console.log('modify args', args);
                let modifyEntry = {
                    ...args
                };
                return await Entries.findByIdAndUpdate(args.id, modifyEntry, {new: true})
                } else {
                    let {filename, createReadStream} = await args.File.File;
                    const stream = createReadStream();
                    const pathName = path.join(`C://Users/Mikael/Native/sssf-backend/uploads/${filename}`);
                    console.log('pathname', pathName);
                    await stream.pipe(fs.createWriteStream(pathName));
                    const photourl = {
                        url: `http://localhost:8000/uploads/${filename}`
                    };
                    let modifyEntry = {...args, File: photourl.url};
                    const oldEntry = await Entries.findById(args.id);
                    if(oldEntry.File !== photourl.url){
                    console.log('entry to delete', oldEntry);
                    const oldfilename = oldEntry.File.replace(/^.*(\\|\/|\:)/, '');
                    console.log('filename', oldfilename);
                    await fs.unlink(`C://Users/Mikael/Native/sssf-backend/uploads/${oldfilename}`, (err) => {
                        console.log(err)
                    });
                    }
                    return await Entries.findByIdAndUpdate(args.id, modifyEntry, {new: true})

                }
            } catch (e) {
                throw new Error(e);
            }
        },
        deleteEntry: async (parent, args, {user}) => {
            console.log('dostuff');
            if (!user) {
                throw new AuthenticationError('You have not logged in')
            }
            try {
                const entry = await Entries.findById(args.id);
                console.log('entry to delete', entry);
                const filename = entry.File.replace(/^.*(\\|\/|\:)/, '');
                console.log('filename', filename);
                await fs.unlink(`C://Users/Mikael/Native/sssf-backend/uploads/${filename}`, (err) => {
                    console.log(err)
                });
                return await Entries.findByIdAndDelete(args.id);

            } catch (e) {

            }
        }

    }

}
