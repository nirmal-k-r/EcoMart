const mongoose= require('mongoose');


const connectionString='mongodb+srv://rsp:12345@rspcluster.hqkr1yq.mongodb.net/ecomart?retryWrites=true&w=majority';

db=mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

module.exports=db;