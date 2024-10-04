const express=require("express")
const { Usermiddleware } = require("../middlewares/usermiddleware");
const {Account}=require('../db');
const mongoose=require('mongoose');

const cors=require("cors");
const router=express.Router();
const app=express();
app.use(cors());
app.use(express.json());

router.get("/balance",Usermiddleware,async(req,res)=>{
    const account= await Account.findOne({
        userId:req.userId
    })
    res.status(200).json({
        balance:account.balance
    })
})

router.post("/transfer",Usermiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();//Transaction mongoose

    const to=req.body.to
    const amount=req.body.amount

    const sender=await Account.findOne({
        userId:req.userId
    }).session(session);
    if(!sender || sender.amount<amount){
        await session.abortTransaction();//Transaction mongoose
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const reciver=await Account.findOne({
        userId:to
    }).session(session);
    if(!sender){
        await session.abortTransaction();//Transaction mongoose
        return res.status(400).json({
             message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId:to
    },{ 
        $inc: {
        balance:+amount
        }
    }).session(session);//Transaction mongoose
    await Account.updateOne({
        userId:req.userId
    },{
        $inc: {
        balance:-amount
        }
    }).session(session);//Transaction mongoose

    await session.commitTransaction();//Transaction mongoose

    res.status(200).json({
        message:"Transfer successful"
    })
})

module.exports=router;
