import { Schema, model, models } from "mongoose";

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Export the model
const user = models.User || model("User", userSchema);
export default user;
