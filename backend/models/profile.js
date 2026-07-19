const mongoose=require('mongoose')

const profileschema = new mongoose.Schema({
    userid:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    },
    education:{
        type:String
    },
    college:{
        type:String
    },
    graduationyear:{
        type:Number
    },
    targetrole:{
        type:String
    },
    githuburl:{
        type:String
    },
    linkedinurl:{
        type:String
    },
    skills:{
        type:[String]
    },
    projects:[{
        title:{
            type:String
        },
        description:{
            type:String
        },
        techstack:{
            type:[String]
        }
    }]



}) 
module.exports = mongoose.model("profile",profileschema)