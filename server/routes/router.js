const express = require("express");
const router = new express.Router();
const user = require("../models/userschema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.post('/register', async (req, res) => {
    const { fname, email, password, cpassword } = req.body
    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "Fill all the details" })
    }
    try {
        const preuser = await user.findOne({ email })
        if (preuser) {
            res.status(422).json({ error: "This email already exits!" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and confirm password does not match" })
        } else {
            const finaluser = new user({
                fname, email, password, cpassword
            })
            const storedata = await finaluser.save()
            // console.log(storedata)
            res.status(201).json({ status: 201, storedata })
        }

    }
    catch (error) {
        res.status(422).json(error)
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "Fill all the details" })
    }

    try {
        const userValid = await user.findOne({ email });

        if (userValid) {

            const isMatch = await bcrypt.compare(password, userValid.password);

            if (!isMatch) {
                res.status(422).json({ error: "invalid details" })
            } else {

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
})

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await user.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie", { path: "/" });

        req.rootUser.save();

        res.status(201).json({ status: 201 })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})

module.exports = router