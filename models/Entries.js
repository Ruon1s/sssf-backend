'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const entriesSchema = new Schema ({
    Entryname: String,
    // image: Image,
    Ingredients: String,
    Steps: String,
    Rating: Number,
    Date: Date, //might need to swap
    UserID: String
});

export default mongoose.model('Entries', entriesSchema);
