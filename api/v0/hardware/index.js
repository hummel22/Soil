var router = require('express').Router();

router.get('/', function (req, res) {
    res.send('Hardware API')
})

module.exports = router
