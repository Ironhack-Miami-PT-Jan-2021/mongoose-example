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
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

const Cat = require('./models/Cat');

app.get('/', (req, res, next) => {
    res.render('home');
  });
  

app.get('/create-cat', (req, res, next) => {
  res.render('create-cat');
});

app.get('/cats', (req, res, next) => {
  Cat.find().then((bunchaCats) => {
    res.render('cats', { cats: bunchaCats });
  });
});

app.get('/cats/:id', (req, res, next)=>{
    const idOfCat = req.params.id;
    Cat.findById(idOfCat)
    .then((theCat)=>{
        res.render("single-cat", {theCat: theCat})
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.post('/create-cat', (req, res, next) => {
  Cat.create({
    name: req.body.catName,
    img: req.body.imgUrl,
  }).then(() => {
    res.redirect('/cats');
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/delete-cat/:idofcat', (req, res, next) => {
  const id = req.params.idofcat;
  Cat.findByIdAndDelete(id)
    .then(() => {
      console.log('success');
      res.redirect('/cats');
    })
    .catch((err) => {
      console.log('error', err);
    });
});

app.get('/cats/:id/edit', (req, res, next)=>{
    Cat.findById(req.params.id)
    .then((catFromDB)=>{
        res.render('edit-cat', {theCat: catFromDB});
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.post('/update-cat/:id', (req, res, next)=>{
   Cat.findByIdAndUpdate(req.params.id, {
       name: req.body.catName,
       img: req.body.imgUrl
   }).then((blah)=>{
       res.redirect(`/cats/${req.params.id}`);
   })
   .catch((err)=>{
    console.log(err);
   })
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
