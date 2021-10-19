const mongoose = require("mongoose");

const DB = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.umamd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful.");
  })
  .catch((e) => {
    console.log("Connection UnSuccessful.");
    console.log(e);
  });
