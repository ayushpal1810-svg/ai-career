
const Profile= require("../models/profile")

const createprofile = async (req,res)=>{
    try {
        const existingprofile= await Profile.findOne({userid:req.user.id})
        if(existingprofile) return res.status(409).json({ message: "profile already exist"})
        const profile= await Profile.create({
            userid:req.user.id,
            ...req.body
        });
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({
            message:error.message
    });
    }
}

const getprofile = async (req, res) => {
    try {
        const existingprofile = await Profile.findOne({
            userid: req.user.id
        });

        if (!existingprofile) {
            return res.status(404).json({
                message: "Profile not found."
            });
        }

        res.status(200).json(existingprofile);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateprofile= async(req,res)=>{
    try {
          const updatedprofile = await Profile.findOneAndUpdate({userid:req.user.id},
            {...req.body},
            {new:true},
          )
           if (!updatedprofile) {
            return res.status(404).json({
                message: "Profile not found."
            });
        }

        res.status(200).json(updatedprofile);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports= {createprofile , getprofile , updateprofile};