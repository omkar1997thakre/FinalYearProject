const mongoose=require("mongoose")

const validator=require("validator")

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
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid")
            }
        }
    },
    Password : {
        type: String,
        required:true,
        minlength: 8,
        maxlength:20
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