var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});
/* GET ALL userS */
router.get('/', function(req, res, next) {
  user.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE user BY ID */
router.get('/:id', function(req, res, next) {
  user.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE user */
router.post('/', upload.single('image'), function(req, res, next) {
    let data = req.body;
    data.image = req.file.filename;
  user.create(data, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE user */
router.put('/:id',upload.single('image'), function(req, res, next) {
    let data = req.body;
    data.image = req.file.filename;
  user.findByIdAndUpdate(req.params.id, data, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE user */
router.delete('/:id', function(req, res, next) {
  user.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
