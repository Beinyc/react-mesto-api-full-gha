const router = require('express').Router();

router.get('/logout', (req, res) => { res.status(200).clearCookie('jwt').send({ message: 'Cookie-данные удалены' }); });

module.exports = router;
