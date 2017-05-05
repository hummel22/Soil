var router = require('express').Router();
controller = require("./controller.data");

router.get('/', controller.index);
router.post('/', controller.post);


module.exports = router;
