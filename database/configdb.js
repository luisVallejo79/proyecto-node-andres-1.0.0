// Using Node.js `require()`
const mongoose = require('mongoose');

const dbConection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('Base de datos Online');

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConection
}

