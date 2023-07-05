const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

// const User = require('./userSchema'); // Importarea modelului User

// const newUser = new User({
//   name: "John Doe",
//   email: "john.doe@example.com",
//   role: "subscriber",
//   cart: [],
//   address: "123 Street, City",
//   wishlist: [],
// });

// newUser.save((err, user) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Utilizatorul a fost salvat cu succes:", user);
//   }
// });