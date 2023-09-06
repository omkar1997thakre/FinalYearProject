const mongoose=require("mongoose")

const validator=require("validator")

const MoviesDetails=new mongoose.Schema({
    ImageUrl : {
        type: String,
        required:true,
    },
    BackgroundImageUrl:{
        type:String,
    },
    ReleaseDate:{
        type:Date,
        required:true,
    },
    MovieDurtion:{
        type:String,
        required:true,
    },
    MovieType:{
        type:String,
        required:true,
    },
    AboutMovie:{
        type:String,
        required:true,
    },
    Trailer:{
        type:String,
        required:true,
    },
    MovieCasting:{
        type:String,
    },
    MovieCrew:{
        type:String,
    },
    SerialNumber:{
        type:Number,
        required:true,
        unique:true,
    }
})

//create a colection

const MovieDetail = new mongoose.model("MovieDetails",MoviesDetails)

module.exports=MovieDetail;