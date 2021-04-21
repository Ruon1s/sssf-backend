import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log(process.env.DB_URL);
        const connection = await mongoose.connect(process.env.DB_URL,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,

            });
        return connection;
    } catch(e) {
        console.log('connection to db failed' + e);
    }
};
export default connectDB;
