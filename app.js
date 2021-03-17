require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose
  .connect('mongodb://localhost/mongooseExample', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));


const Cat = require('./models/Cat');

app.get('/', (req, res, next)=>{
    res.render('index');
});


app.get('/cats', (req, res, next)=>{
    Cat.find().then((bunchaCats)=>{
        res.render('cats', {cats: bunchaCats});
    })
});

app.post('/create-cat', (req, res, next)=>{
    Cat.create({
        name: req.body.catName,
        img: req.body.imgUrl
    }).then(()=>{
        res.redirect('/cats');
    }).catch((err)=>{
        console.log(err)
    })
})


app.post('/delete-cat/:idofcat', (req, res, next)=>{
    let id = req.params.idofcat;
    Cat.findByIdAndDelete(id)
    .then(()=>{
        console.log('success')
        res.redirect('/cats')
    })
    .catch((err)=>{
        console.log('error', err)
    })
})



app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
