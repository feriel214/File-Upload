var express = require('express');
var cors = require('cors')
var app = express();
var multer  = require('multer')
 var upload = multer({ dest: 'uploads/' })


app.use(express.static('app'));
app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname;
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&',originalname)

    let ext = originalname.split('.').pop();
    let filename = originalname.split('.').slice(0, -1).join('.');

    cb(null, filename + '-' + Date.now()+'.'+ext)
  }
})
 
var upload = multer({ storage: storage })

var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("File upload app listening at http://%s:%s", host, port)
});


app.post('/upload',upload.single('photo'),  (req, res) => {
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ',JSON.parse(JSON.stringify(req.body)));
  let o=JSON.parse(JSON.stringify(req.body));
  console.log(typeof(o))
  console.log(o[" lastname"])
  res.send({"status": "success"})
})

