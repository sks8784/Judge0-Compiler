const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user=require("./routes/userRoute");
const compiler=require("./routes/compilerRoute");

const errorMiddleware=require("./middleware/error");

require("dotenv").config({path:".env"});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connection is successful");
}).catch((err)=>{
    console.log("no connection");
})

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1",user);
app.use("/api/v1",compiler);

app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}!`);
});