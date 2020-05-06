const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./logging/logger');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const routes = require('./routes')
const responseTime = require('response-time')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors')

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({extended:false}));
morgan.token('date', function() {
    var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});

app.use(cors())
app.options('*', cors())
app.use(responseTime());
app.use(morgan('combined',{stream:logger.stream}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
      console.log('Invalid Request data')
      res.json({error:err,message:err.message})
    } else {
      next()
    }
  })

  mongoose.connect(keys.mongoURI,
    { useNewUrlParser: true ,useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


app.get('/',(req, res) => res.send('Welcome to OrangeLive WEB API Server'));

app.use('/api',routes)

app.use('*', function(req, res){
    res.status(404).json({error:404,message:"Route not found"});
  });


app.listen(keys.port, () => {
    logger.log('info',`Server is listening at ${keys.port}`)
})
