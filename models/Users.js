'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    _id: {type: String}
});

export default mongoose.model('User', userSchema);
