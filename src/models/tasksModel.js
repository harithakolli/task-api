const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        title : {type: String, required: true},
        is_completed : {type : Boolean, required: true, default: false}
    }
);


const taskModel = mongoose.model("tasks", TaskSchema);

module.exports = taskModel;