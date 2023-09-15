const {getAdmin, createAdmin, updateAdmin, deleteAdmin} = require('../controllers/admin')

const router = require('express').Router()

router.get('/admin', getAdmin)
router.post('/admin', createAdmin)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)

module.exports = router