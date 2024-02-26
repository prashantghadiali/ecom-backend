const Users = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.create({ email, password });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findByIdAndUpdate(req.params.id, { email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// const Users = require('../models/user');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// // const Student = require('../models/student');
// var cookieParser = require('cookie-parser');
// // const fs = require("fs");
// // const csv = require("fast-csv");

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'net ninja secret', {
//     expiresIn: maxAge
//   });
// };


// // for render sign up page
// module.exports.signUp = function(req, res){
//     return res.render('sign_up_view', {
//         title: "Ecom App | Sign Up"
//     })
// }

// // for render sign in page
// module.exports.signIn = function(req, res){
//     return res.render('sign_in_view', {
//         title: "Ecom App | Sign In"
//     });
// }

// // create Employee in Database
// module.exports.create = async function(req, res, next){
//     // if password and confirm password not matched redirect back
//     if (req.body.password != req.body.conf_pass) {
//         console.log("pass and conf pass not matched");
//         return res.status(400).json({
//             messeage: "Please Enter Same Value of Password and Confirm Password!",
//             data: {},
//         });
//         // return res.redirect('back');
//     }
//     console.log("req.body: ",req.body.email);
//     try{
//         // If password and confirm password matched, find employee.
//         let user = await Users.findOne({email:req.body.email});
//         if(user){
//             res.status(201).json({ messeage: "user is already exists!" });
//         }
//         const { email, password } = req.body;
//         // if that email is not in database, then create new employee.
//         if(!user){
//             user = await Users.create({ email, password });
//                 console.log("create Success", { email, password });
//                 const token = createToken(user._id);
//                 res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

//                 return res.status(201).json({ user: user._id, token });
//                 // return res.redirect('/emp/signin');
//         }
//         else{
//             return res.redirect('back');    // if eployee is in database then redirect back 
//         }
//     }catch(err){
//         console.log("Error in Users Create", err);   // if detects any error
//     }
// }

// // Endpoint to view user profile
// module.exports.viewProfile = async function(req, res, next) {
//     try {
//         // Fetch user ID from decoded token (available in req.user)
//         const userId = req.user.userId;

//         // Fetch user details from the database
//         const user = await Users.findById(userId);

//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // If user exists, return user details
//         return res.status(200).json({ user });
//     } catch (err) {
//         console.error("Error fetching user profile:", err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// // for Users list page 
// // module.exports.userPage = async function(req, res){
// //     try {
// //         //Student list is fetch in db. It is sort by latest entry and limit by 10 entries.
// //         let findList = await Users.find({}).limit(10).sort({ _id: -1 });     
// //         var user_id = req.cookies.emp_id;     //cookie is get by request to browser.
        
// //         // if cookie is available then renders Employee Page else redirect back.
// //         if(user_id){
// //             // console.log("cookie", user_id);
// //             return res.render('userpage', {
// //                 title: "App | User Section",
// //                 stdlist: findList,
// //                 user_id: user_id
// //             });
// //         }
// //         else{
// //             return res.redirect('back')  // if detects no cookie value
// //         }
// //     } catch (error) {
// //         console.log("Error :", error);    // if it detects any error.
// //     }
// // }

// // for sign in page (named sign in)
// // module.exports.makeSession = async function(req, res){
// //     try {
// //         let user = await Users.findOne({email: req.body.email});
// //         if (user) {
// //             console.log("Success, User is Found in Database", user);
// //             if (user.password != req.body.password) {
// //                 console.log("Password Doesen't Match");
// //                 return res.status(400).json({
// //                     messeage: "Please Enter Same Value of Password and Confirm Password!",
// //                     data: {},
// //                 });
// //                 // return res.redirect('back');
// //             }
// //             console.log("req body:", req.body);

// //             // Handle Session Creation
// //             res.cookie('user_id', user.id);
// //             return res.redirect('/user/userpage');
// //         }else{
// //             return res.redirect('back');
// //         }
// //     } catch (error) {
// //         console.log("User is not Found in Database", error);    
// //     }
// // }

// // Update User Details
// // module.exports.updateUser = async function(req, res) {
// //     try { 
// //       // console.log("in Update");
// //       let user = await Users.find({}).limit(10).sort({ _id: -1 });
// //       // Get the form data from the body parameters
// //       console.log("update body :", req.body);
// //       const { stuid, comp, shdate } = req.body;
// //       if(user){
// //         // Find the student by id and push a new interview object to the interview array
// //         let student = await Users.findByIdAndUpdate(stuid, {
// //           $push: {
// //             interview: {
// //               stuid: stuid,
// //               comp: comp,
// //               date: shdate,
// //             }
// //           }
// //         }, { new: true });
// //         if (student) {
// //           console.log("Interview Created");
// //           return res.redirect('back');
// //         }else{
// //           return res.redirect('back');
// //         }
// //       }
// //     } catch (err) {
// //       // Handle error
// //       console.error(err);
// //       res.status(500).send("Something went wrong");
// //     }
// //   };

