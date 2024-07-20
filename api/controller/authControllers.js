var jwt = require("jsonwebtoken");
var bcryptjs = require("bcryptjs");
const query = require('../queries/queries1')
const pool = require('../db');

const signUp = async (req, res, next) => {

    const { username, email, password, age, gender } = req.body;

    const hashPassword = bcryptjs.hashSync(password, 10) //it convert the password into hashcode and make it hard

    pool.query(query.createUser, [username, email, hashPassword, age, gender], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Email Already existed' });
        }
        res.status(201).json({ message: "User Created Successfully" });
    });
}

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        pool.query(query.checkEmail, [email], (err, data) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            } else {
                if (data.rows.length === 0) {
                    console.error('User not found:', email);
                    return res.status(401).json({ message: "Empty []" });
                }

                const validUser = data.rows[0];
                const validPassword = bcryptjs.compareSync(password, validUser.password);

                if (!validPassword) {
                    // console.error('Invalid password for user:', email);
                    return res.status(401).json({ message: "Invalid email or password" });
                }
                const secretKey = 'rjokkkj'
                const token = jwt.sign({ id: validUser.id }, secretKey);
                const expiryDate = new Date(Date.now() + 3600000); // 1 hour
                const { password: hashPassword, ...rest } = validUser;

                res.cookie('access_token1', token, { httpOnly: true, expires: expiryDate })
                    .status(200)
                    .json(rest);
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        next(err);
    }
};


// const google = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.email })
//         if (user) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
//             const { password: hashPassword, ...rest } = user._doc
//             const expiryDate = new Date(Date.now() + 3600000); // 1 hour
//             res.cookie('access_token1', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
//         }
//         else {
//             const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
//             const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
//             const newUser = new User({
//                 username: req.body.name.split(' ').join('').toLowerCase() +
//                     Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, profilePhoto: req.body.photo
//             })
//             await newUser.save();
//             const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//             const { password: hashedPassword2, ...rest } = newUser._doc;
//             const expiryDate = new Date(Date.now() + 3600000); // 1 hour
//             res
//                 .cookie('access_token', token, {
//                     httpOnly: true,
//                     expires: expiryDate,
//                 })
//                 .status(200)
//                 .json(rest);
//         }
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = { signIn, signUp }