import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    brief:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true}
},{timestamps:true})

export default mongoose.model("Task",taskSchema);