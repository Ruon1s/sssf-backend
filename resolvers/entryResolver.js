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
        },
        singleEntry: async (parent, args) => {
            console.log('singleEntry args:', args);
            return Entries.findById(args.id);
        },
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
                    //	console.log('arguments:', await args.File[0].prototype);
                    let {filename, createReadStream} = await args.File.File;
                    console.log(filename);
                    const stream = createReadStream();
                    const date = Date.now().toString();
                    const pathName = path.join(`/home/jelastic/ROOT/public_html/${date}${filename}`);
                    console.log('pathname', pathName);
                    await stream.pipe(fs.createWriteStream(pathName));
                    const photourl = {
                        url: `https://charge.jelastic.metropolia.fi/${date}${filename}`
                    };
                    let entry = {...args, File: photourl.url};
                    let newEntry = new Entries(entry);
                    const rslt = await newEntry.save();
                    return rslt;
                }
            } catch (e) {
                throw new Error(e);
            }


        },
        modifyEntry: async (parent, args, {user}) => {
            if (!user) {
                throw new AuthenticationError('You have not logged in')
            }

            try {
                if (!args.File) {
                    console.log('modify args', args);
                    let modifyEntry = {
                        ...args
                    };
                    return await Entries.findByIdAndUpdate(args.id, modifyEntry, {new: true})
                } else {
                    console.log('modifyArguments', args);
                    let {filename, createReadStream} = await args.File.File;
                    const stream = createReadStream();
                    const date = Date.now().toString();
                    const pathName = path.join(`/home/jelastic/ROOT/public_html/${date}${filename}`);
                    console.log('pathname', pathName);
                    await stream.pipe(fs.createWriteStream(pathName));
                    const photourl = {
                        url: `https://charge.jelastic.metropolia.fi/${date}${filename}`
                    };
                    let modifyEntry = {...args, File: photourl.url};
                    const oldEntry = await Entries.findById(args.id);
                    console.log(oldEntry.File);
                    console.log(photourl.url);
                    if (oldEntry.File !== photourl.url) {
                        console.log('entry to delete', oldEntry);
                        const oldfilename = oldEntry.File.replace(/^.*(\\|\/|\:)/, '');
                        console.log('filename', oldfilename);
                        await fs.unlink(`/home/jelastic/ROOT/public_html/${oldfilename}`, (err) => {
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
                await fs.unlink(`/home/jelastic/ROOT/public_html/${filename}`, (err) => {
                    console.log(err)
                });
                return await Entries.findByIdAndDelete(args.id);

            } catch (e) {
                throw new Error(e);
            }
        }

    }

}




