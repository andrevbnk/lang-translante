const express = require("express");
const app = express();  

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const cors = require("cors");

const PORT = process.env.PORT || 3000;

const Reverso = require('reverso-api');
const reverso = new Reverso();


app.post('/api/translate',jsonParser,(req,res)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept",
      );
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.set('Access-Control-Allow-Credentials', 'true');
    if(req.body.message){
        reverso.getContext(req.body.message, req.body.from, req.body.to).then(response => {
            return res.status(200).send(response);
        }).catch(err => {
            return console.error(err);
        });
    }
});



const server = app.listen(PORT, function() {
  console.log('server running on port '+PORT);
});



let corsOptions = {
  origin: "*",
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  credentials: true,
};

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
  );
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", jsonParser,(req, res) => {
  res.json({ message: "sdsd" });
});

app.use((err, req, res, next) => {
  console.log(err.stack,"err stack");

  res.status(500).json({error: err.stack})
});

















