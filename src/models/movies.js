const mongoose=require("mongoose")

const validator=require("validator")

const Movies=new mongoose.Schema({
    ImageUrl : {
        type: String,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    MovieType:{
        type:String,
        required:true,
    },
    Rating:{
        type:String,
    },
    SerialNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    PageUrl:{
        required:String,
    }
})

//create a colection

const MovieData = new mongoose.model("MoviesData",Movies)

module.exports=MovieData;