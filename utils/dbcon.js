const { connect } = require("mongoose");

const DB_URL = "process.env.DB_URL";
exports.connectToDb = async () => {
  try {
    await connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connection successful");
  } catch (err) {
    console.log(err);
    process.exit(1); // kill the process if db connection is not successful
  }
};
