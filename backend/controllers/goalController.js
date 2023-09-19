const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');

const Goal = require ('../model/goalModel')
const { sendResponse } = require ('./responseHandler')
// const jobValidation = require('./validation')
// const jobUpdateValidation = require('./validation')
const { jobValidation, jobUpdateValidation } = require('./validation');

// get goals
//route GET /api/goals
// access PRivate
// const getGoals = asyncHandler(async (req, res) => {

// const { currentPage = 1, limit = 10, sort, ...filter } = req.query;
// const skip = (currentPage - 1) * limit;
// // const sortOptions = sort ? { [sort]: 1 } : {};
//     const sortOptions = req.query.sort || ''; // Sort option from the request query
  
  
//     let sortOption = {};
//   if (sortOptions) {
//     if (sortOptions.startsWith('-')) {
//       // Sort in descending order
//       const field = sortOptions.substring(1);
//       sortOptions[field] = -1;
//     } else {
//       // Sort in ascending order
//       sortOption[sortOptions] = 1;
//     }
//   }

// console.log(filter);

//     const totalJobs = await Goal.countDocuments();
//     const goals = await Goal.find(filter)
//     .sort(sortOptions)
//     .collation({ locale: 'en', strength: 2 })
//     .skip(skip)
//     .limit(limit)
//     .then(goals => {
//       sendResponse(res, totalJobs, currentPage, goals);
//     })
//     .catch(error => res.status(500).send(error.message));
// });


const getGoals = asyncHandler(async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.limit) || 10;
  const skip = (currentPage - 1) * perPage;
  const sort = req.query.sort || '';

  let sortOptions = {};
  if (sort) {
    if (sort.startsWith('-')) {
      // Sort in descending order
      const field = sort.substring(1);
      sortOptions[field] = -1;
    } else {
      // Sort in ascending order
      sortOptions[sort] = 1;
    }
  }

  // Filter options
  const filters = {};

  // Example: Filter by company
  if (req.query.company) {
    filters.company = req.query.company;
  }

  // Example: Filter by location
  if (req.query.location) {
    filters.location = req.query.location;
  }

  // Example: Filter by level
  if (req.query.level) {
    filters.level = req.query.level;
  }

  // Example: Filter by language
  if (req.query.language) {
    filters.language = { $in: [req.query.language] };
  }

  // Example: Filter by tool
  if (req.query.tool) {
    filters.tool = req.query.tool;
  }
  if (req.query.new) {
    filters.new = req.query.new;
  }
  
  if (req.query.postedAt) {
    filters.postedAt = req.query.postedAt;
  }
  if (req.query.featured) {
    filters.featured = req.query.featured;
  }
  const totalJobs = await Goal.countDocuments(filters);
  const goals = await Goal.find(filters)
    .skip(skip)
    .limit(perPage)
    .sort(sortOptions)
    .collation({ locale: 'en', strength: 2 })
    .then(goals => {
            sendResponse(res, totalJobs, currentPage, goals);
          })
          .catch(error => res.status(500).send(error.message));

  // sendResponse(res, totalJobs, currentPage, goals);
});
// const getGoals = asyncHandler(async (req, res) => {
//   // const { page = 1, limit = 10, sort, ...filter } = req.query;
//   // const skip = (page - 1) * limit;
  

//     const currentPage = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.limit) || 10;
//     const skip = (currentPage - 1) * perPage;
//     // const sortOptions = sort ? { [sort]: 1 } : {};
//     const sort = req.query.sort || ''; // Sort option from the request query
  
  
//     let sortOptions = {};
//   if (sort) {
//     if (sort.startsWith('-')) {
//       // Sort in descending order
//       const field = sort.substring(1);
//       sortOptions[field] = -1;
//     } else {
//       // Sort in ascending order
//       sortOptions[sort] = 1;
//     }
//   }

  
//     const totalJobs = await Goal.countDocuments();
//     const goals = await Goal.find().skip(skip).limit(perPage).sort(sortOptions)
//     .collation({ locale: 'en', strength: 2 });
  
//     sendResponse(res, totalJobs, currentPage, goals);
//   });

 
   
// const getGoal = asyncHandler(async (req, res) => {
//   const goalId = req.params.id;

//   if (!isValidObjectId(goalId)) {
//     res.status(400);
//     throw new Error('Invalid goal ID');
//   }

//   try {
//     const goal = await Goal.findById(goalId);

//     if (!goal) {
//       res.status(404);
//       throw new Error('Goal not found');
//     }

//     const totalJobs = await Goal.countDocuments();
//     const currentPage = parseInt(req.query.page) || 1;
//     sendResponse(res, totalJobs, currentPage, goal);
//   } catch (error) {
//     if (error.name === 'CastError') {
//       res.status(400);
//       throw new Error('Invalid goal ID');
//     }
//     throw error;
//   }
// });
const getGoal =asyncHandler (async (req,res) =>{
  const goalId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(goalId)) {
    res.status(400);
    throw new Error('Invalid goal ID');
  }  
  const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
        
      }
      // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true,})
      
  
    const totalJobs = await Goal.countDocuments();
    const currentPage = parseInt(req.query.page) || 1;
      sendResponse(res, totalJobs, currentPage, goal);
    // res.status(200).json(goal)
    // res.status(200).json({message: `update goals ${req.params.id}`})
})


// @set goals
// @route POST /api/goals
// @access PRivate


// const setGoals = asyncHandler ( async (req,res)=> {
//     // console.log(req.body.text);

//     if(!req.body.text){
//         // res.status(400).json({message: 'Please add a text field'})
//         res.status(400)
//         throw new Error ('Please add a text field')

//     }
//     const goal = await Goal.create({
//         text: req.body.text
//     })
//     res.status(200).json(goal)

//     // res.status(200).json({message: 'set goals'})
// })

const setGoals = asyncHandler ( async (req,res)=> {
// app.post('/newjobs', (req, res) => {
    console.log('Received POST request to create a job listing');
    console.log('Request body:', req.body); // Log the request body to see what's being sent
  
    const { error } = jobValidation.validate(req.body);
    if (error) {
      console.error('Validation error:', error.details[0].message); // Log the validation error
      return res.status(400).send(error.details[0].message);
    }
  
    console.log('Creating a new job listing:', req.body);
  
    const jobListing = new Goal(req.body);
    jobListing.save()
      .then(() => {
        console.log('Job listing created successfully');
        res.sendStatus(201);
      })
      .catch(error => {
        console.error('Error while saving job listing:', error.message);
        res.status(500).send(error.message);
      });
  });
  
//@put update  goals
//@route GET /api/goals/:id
//@access PRivate
// const updateGoals = asyncHandler (async (req,res)=> {
//     const goal = await Goal.findById(req.params.id)
//     if(!goal){
//         res.status(400)
//         throw new Error('Goal not found')
//     }
//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true,})
//     res.status(200).json(updatedGoal)
//     // res.status(200).json({message: `update goals ${req.params.id}`})
// })

const updateGoals = asyncHandler (async (req,res)=> {

// app.put('/jobs/:id', (req, res) => {
    const { error } = jobUpdateValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const goalId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(goalId)) {
      res.status(400);
      throw new Error('Invalid goal ID');
    }  
    const goal = await Goal.findById(req.params.id)
        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }
         await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true,})
        // res.status(200).json(updatedGoal)
        res.status(200).json({message: `update Job ${req.params.id}`})
  });



//@delete goals
//@route DELETE /api/goals
//@access PRivate
const deleteGoals = asyncHandler (async (req,res)=> {
  const goalId = req.params.id;

 if (!mongoose.Types.ObjectId.isValid(goalId)) {
   res.status(400);
   throw new Error('Invalid goal ID');
 }  
    const goal = await Goal.findByIdAndRemove(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    // await goal.remove()
    res.status(200).json({message: `delete job ${req.params.id}`})

    // res.status(200).json({message: `delete goals ${req.params.id}`})
})


// Delete a job listing
// app.delete('/jobs/:id', (req, res) => {
//     Goal.findByIdAndRemove(req.params.id)
//       .then(() => res.sendStatus(204))
//       .catch(error => res.status(500).send(error.message));
//   });



module.exports ={
    getGoals,
    getGoal,
    setGoals,
    updateGoals,
    deleteGoals
}