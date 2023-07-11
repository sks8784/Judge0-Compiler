const express = require("express");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1",user);
app.use("/api/v1",compiler);

app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}!`);
});