
'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

var obj;
// [START API]
// Say done/no!

fs.readFile('data.json', 'utf8', function (err, data) {
          if (err) throw err;
          obj = JSON.parse(data);
       });
app.param('id', function(req, res, next, id) {

    // check if the user with that id exists
    // do some validations 
	req.id = id; // getting value of id from url

    next();
});
app.get('/id/:id/', (req, res) => {
	
	 
       var k=0;
          for(var i=0;i<Object.keys(obj.key).length;i++){
          	 if(req.originalUrl.substring(13) === obj.key[i]){
         	 	
          	 	        res.status(200).send('done');
          	 	        break;
          	 }
          	k++; 
          }
          
          res.status(200).send("no");
  
});
// [END Operation]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
