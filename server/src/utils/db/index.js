const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);

run()
  .then(() => console.log('DB is connected'))
  .catch(error => console.error(error.stack));

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, 
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
}

module.exports = { mongoose };