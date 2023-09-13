const router = require('express').Router()

const helloRoute = require('./api/routes/hello.route')
const adminRoute = require('./api/routes/adminRoutes')
const bankAccountRoute = require('./api/routes/bankAccountRoutes')

/**
 * api routes
 */
router.use('/api/hello', helloRoute)
router.use('/api', adminRoute)
router.use('/api', bankAccountRoute)


module.exports = router
