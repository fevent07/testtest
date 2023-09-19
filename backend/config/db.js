const mongoose = require ('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const connectDB = async () => {
    console.log(process.env.NODE_ENV)

    console.log(process.env.MONGO_URI)
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
    }catch (error){
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB