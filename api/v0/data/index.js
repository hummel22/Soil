var router = require('express').Router();
controller = require("./controller.data")

router.get('/', controller.index);
router.get('/:page', controller.page);


module.exports = router
