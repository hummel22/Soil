var router = require('express').Router();
controller = require("./controller.data")

router.get('/', controller.index);
router.post('/', controller.add);


module.exports = router
