const asyncHandler = require('express-async-handler')


// get goals
//route GET /api/goals
// access PRivate
const getGoals = asyncHandler (async (req,res)=> {
    res.status(200).json({message: 'Get goals'})
})
//@set goals
//@route POST /api/goals
//@access PRivate
const setGoals = asyncHandler ( async (req,res)=> {
    // console.log(req.body.text);
    if(!req.body.text){
        // res.status(400).json({message: 'Please add a text field'})
        res.status(400)
        throw new Error ('Please add a text field')

    }
    res.status(200).json({message: 'set goals'})
})
//@put update  goals
//@route GET /api/goals/:id
//@access PRivate
const updateGoals = asyncHandler (async (req,res)=> {
    res.status(200).json({message: `update goals ${req.params.id}`})
})
//@delete goals
//@route DELETE /api/goals
//@access PRivate
const deleteGoals = asyncHandler (async (req,res)=> {
    res.status(200).json({message: `delete goals ${req.params.id}`})
})



module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}