'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const entriesSchema = new Schema ({
    Entryname: String,
    File: String,
    Ingredients: String,
    Steps: String,
    Rating: Number,
    Date: Number, //might need to swap
    userID: String
});

export default mongoose.model('Entries', entriesSchema);
