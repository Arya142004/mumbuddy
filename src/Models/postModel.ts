import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    images: [],
    location: [],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
