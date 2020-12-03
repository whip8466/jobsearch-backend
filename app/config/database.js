const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

require('../models/Users');
require('../models/Jobs');
require('../models/Tags');
require('../models/JobTags');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to database!'))
  .catch(err => {
      console.error('Could not connect to database!‌', err);
      process.exit();
  });
