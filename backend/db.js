const  mongoose =require ("mongoose");

// const {schema}=mongoose;

mongoose.connect("Your db url here ")
// ease way to do it->
const userschema=new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String
});

const accountschema=new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
// right way to do it ->
    // const userschema= new schema({
    //    username:{
    //     type:String,
    //     required:true,
    //     unique:true,
    //     trim:true,
    //     lowercase:true,
    //     minlength:6,
    //     maxlength:30
    //    },
    //    password:{
    //     type:String,
    //     requireed:true,
    //     minlength:6
    //    },
    //    firstname:{
    //     type:String,
    //     required:true,
    //     trim:true,
    //     maxlength:20
    //    },
    //    lastname:{
    //     type:String,
    //     required:true,
    //     trim:true,
    //     maxlength:20
    //    }
// });
const Account=mongoose.model('Account',accountschema);
const User= mongoose.model('User',userschema);
module.exports= {
    User,
    Account
};