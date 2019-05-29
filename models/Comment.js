//get our mongoose
var mongoose = require("mongoose");

//getting our schema ready for the comment section
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
