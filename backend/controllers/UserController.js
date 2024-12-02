import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";



const createToken = (_id) => {
  return jwt.sign( {_id },process.env.JWT); //send this jwt to verify our identity
}
//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

 // Check if the user exists
 if (!user) throw Error("User not found!");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) throw Error("Incorrect password!");

    //create a token 
    const token = createToken(user._id)

    // res.cookie("access_token", token, {
    //   httpOnly: true, // Secure the token to prevent client-side access
    // })
    // .status(200)
    // .json({ email,token });
    res.status(200).json({email, token})

    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
export const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    //validation
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }


    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    //create a token
   const token = createToken(newUser._id)

    res.status(201).send({email, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
