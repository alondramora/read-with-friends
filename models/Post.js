const mongoose = require("mongoose");


// We use Mongoose Schemas so we have structure/ a format/template for data going into the database
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporting this schema with the name of Post to use throughout the application
// We can import it into the application wherever we choose to. Ex: Line 2 of controllers/posts.js
// MongoDB will make the word Post plural in the database, so in MongoDB the collection will be called posts
module.exports = mongoose.model("Post", PostSchema);
