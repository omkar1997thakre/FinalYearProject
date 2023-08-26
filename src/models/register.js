const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    FirstName : {
        type: String,
        required:true
    },
    LastName : {
        type: String,
        required:true
    },
    Email : {
        type: String,
        required:true,
        unique:true
    },
    Password : {
        type: String,
        required:true,
    },
    ConfrimPassword : {
        type: String,
        required:true,
    },
    Address : {
        type: String
    },
   City : {
        type: String
    },
    State : {
        type:String
    },
    Gender : {
        type:String,
        required:true
    }
})

//create a colection

const Register = new mongoose.model("RegisterData",UserSchema)

module.exports=Register;