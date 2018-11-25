const doctorsCtrl = require('../controllers/doctors.controller')
const express = require('../../node_modules/express')
const router = express.Router()

router.route('/')
    .post(doctorsCtrl.listTopDoctors)

router.route('/specializations')
    .get(doctorsCtrl.listPossibleSpecializations)

module.exports = router