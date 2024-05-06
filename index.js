
const connectToMongo = require('./db');
const express = require('express')

var cors = require('cors');

connectToMongo();
const app = express()

const port = 8080

app.use(cors())
app.use(express.json())
 

// app.use(fileUpload({
//   useTempFiles:true
// }))
//available routes
app.use("/api", require("./Routes/ProducteRoutes"));
app.use("/api", require("./Routes/Auth"));
  
app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'Welcome to DressStore Application'
  })
})

app.listen(port, () => {
  console.log(`Market Place backend listening at on //localhost:${port}`)
})

module.exports = app;