const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    password: { type: String, required: [true, "password is required"] },
    role: { type: Number, default: 0 },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  console.log(this.password);
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (e) {
    throw Error("could not hash password");
  }
});

module.exports = mongoose.model("User", userSchema);
