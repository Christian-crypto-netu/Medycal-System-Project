const mogoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
  try {
    await mogoose.connect(process.env.DB_mongo,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('DB Conectada');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};



module.exports = conectarDB