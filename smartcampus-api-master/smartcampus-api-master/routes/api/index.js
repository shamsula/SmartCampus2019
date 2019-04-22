var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/events', require('./events'));
router.use('/comment', require('./comment'));
router.use('/friend', require('./friend'));

// validation error handler for any /api calls
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;