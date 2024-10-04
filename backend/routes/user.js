const express= require("express");
const router= express.Router();
const jwt=require("jsonwebtoken");
const {Usermiddleware}=require("../middlewares/usermiddleware")
const {Account}=require("../db")
const {User}=require("../db");
const app=express();
const zod=require("zod");
const { JWT_SECRET } = require("../config");
const cors=require("cors");
app.use(cors());
app.use(express.json());

const signupschema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})
router.post("/signup",async (req,res)=>{
   const body=req.body;
       const {success}=signupschema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user= await User.findOne({
        username:body.username
    })
    if(user){
        return res.status(411).json({
            message:"Email already taken"
        })
    }
    const dbuser= await User.create(body);
    const userId=dbuser._id;
    const token=jwt.sign({
        userId
    },JWT_SECRET);
    await Account.create({
        userId,
        balance:1+ Math.random()*10000
    })
    res.json({
        message: "User created successfully",
	    token: token
    })

});

const signinschema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async(req,res)=>{
    const body=req.body;
    const {success}=signinschema.safeParse(body);
if(!success){
    return res.status(411).json({
        message:'Wrong inputs'
    })
}
    const dbuser=await User.findOne({
        username:body.username,
        password:body.password
    })
    if(!dbuser){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const token=jwt.sign({
        userId:dbuser._id
    },JWT_SECRET);
    return res.status(200).json({
        token:token
    })
});

const updateschema=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
});
router.put("/",Usermiddleware,async(req,res)=>{
    const {success}= updateschema.safeParse(res.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(
        req.body, {
        id: req.userId
    })
    res.json({
        message: "Updated successfully"
    })
});

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[
            {
                firstname:{
                    "$regex":filter
                }
            },{
                lastname:{
                    "$regex":filter
                }
            }
        ]
    })
    res.json({
        user:users.map(user=> ({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id,

        }))
    })
})
module.exports=router;
