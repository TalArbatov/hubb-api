const mongoose = require('mongoose');

const HubSchema = mongoose.Schema({ 
  name: {type: String, required: true},
  description: {type: String, required: true},
  rules: [{type: String}],
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }
  ],
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  privacy: {type: String, required: true},
  dateCreated: {type: Date, required: true}
})







mongoose.model('Hub', HubSchema)