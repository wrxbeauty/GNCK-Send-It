module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.send.bind, connectionParams);
        console.log("Connected to MongoDB")
        } catch(error) {
            console.log(error);
            console.log("Could not connect to MongoDB")
        }
}