const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  hub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  votes: Number,
  voters: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      voteType: { type: String, required: true }
    }
  ]
});

mongoose.model("Post", PostSchema);
