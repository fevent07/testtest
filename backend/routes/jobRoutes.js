const express = require ('express')
const router = express.Router()
const { getJobs, getJob, setJobs, updateJobs,deleteJobs } = require ('../controllers/jobController')

// router.get('/', getGoals)
// router.post('/', setGoals)

const {protect} = require('../middleware/authMiddleware')
 
router.route('/').get(getJobs).post(protect, setJobs)

router.route('/:id').get(getJob).put(protect, updateJobs).delete(protect, deleteJobs)

// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)




// router.get('/', (req, res) => {
//     res.status(200).json({message: 'Get goals'})
// })
// router.post('/', (req, res) => {
//     res.status(200).json({message: 'set goals'})
// })
// router.put('/:id', (req, res) => {
//     res.status(200).json({message: `update goals ${req.params.id}`})
// })
// router.delete('/:id', (req, res) => {
//     res.status(200).json({message: `delete goals ${req.params.id}`})
// })

module.exports = router