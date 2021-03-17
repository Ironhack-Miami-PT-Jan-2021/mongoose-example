const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  img: String,
});

const Cat = mongoose.model('Cat', catSchema);
// mongoose looks at the name of the model, it expect the model to be capitalized and singular
// it will take this word, and lower-case it and pluralize it
// for example, in this case, 'Cat' would make a collection called 'cats'



module.exports = Cat;
// module exports literally means if i go into another file
// and i do let blah = require('./the-relative-path-to-this-file)
// then blah will be equal to the Cat variable on line 9 here