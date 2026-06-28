import mongoose, {Document, Schema} from "mongoose";

export interface IFavorite extends Document {
    userId : mongoose.Types.ObjectId;
    coinId : string
}


const favoriteSchema = new Schema<IFavorite>({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }, 
    coinId : {
        type : String,
        required : true
    }
}, {
    timestamps : true
})

const Favorite = mongoose.model<IFavorite>("Favorite", favoriteSchema)

export default Favorite
