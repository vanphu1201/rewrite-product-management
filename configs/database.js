const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const product = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected Success!")
    } catch (error) {
        console.log("Fail!")
    }
}