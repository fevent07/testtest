const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    company: { type: String, required: true },
    logo: { type: String, required: true     },
    new: { type: Boolean, required: true     },
    featured: { type: Boolean,required: true },
    position: { type: String,  required: true },
    role: { type: String, required: true },
    level: { type: String, required: true },
    postedAt: { type: Date, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
    languages: { type: [String], required: true },
    tools: { type: [String], required: true }
}, {
    timestampls: true, 
}) 
module.exports= mongoose.model('Job', jobSchema)


// const jobSchema = new mongoose.Schema({
//     company: { type: String, required: true },
//     logo: { type: String, required: true     },
//     new: { type: Boolean, required: true     },
//     featured: { type: Boolean,required: true },
//     position: { type: String,  required: true },
//     role: { type: String, required: true },
//     level: { type: String, required: true },
//     postedAt: { type: Date, required: true },
//     contract: { type: String, required: true },
//     location: { type: String, required: true },
//     languages: { type: [String], required: true },
//     tools: { type: [String], required: true }
//   });