const mongoose=require("mongoose")

const validator=require("validator")

const SliderAdv=new mongoose.Schema({
    ImageUrl : {
        type: String,
    },
    Active:{
        type:String
    }
})

//create a colection

const Slider = new mongoose.model("SliderData",SliderAdv)

module.exports=Slider;