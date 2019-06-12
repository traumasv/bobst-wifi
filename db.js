const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    time: { type: Date, required: true },
    status: { type: Number, required: true },
    area: { type: String, require : true }
});

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
console.log('PRODUCTION');
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/hbp253';
}

mongoose.connect(dbconf).catch((err)=>console.log(err)).then(console.log('db connected!'));

module.exports = Post = mongoose.model('Post', PostSchema)