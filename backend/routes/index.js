const express=require("express");
const router=express.Router();
const userRouter=require("./user");
const accountRouter=require("./account");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());

router.use("/user",userRouter);
router.use("/account",accountRouter);

module.exports=router;
