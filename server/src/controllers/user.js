const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const { default: Config } = require("../../config");
const { getTokenFrom } = require("../../utils");
const path = require("path");
const Apartment = require("../models/apartment");
const UserUpgrade = require("../models/userupgrade");
const usersRouter = require('express').Router()
usersRouter.post('/sign-up', [
    // check("email", "Email không phù hợp").isEmail(),
    check('password', 'Mật khẩu phải có ít nhất 6 ký tự')
        .isLength({ min: 6 }).isString().withMessage("Mật khẩu không phù hợp"),
], async (req, res) => {
    console.log(req.body)
    let body = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errorMessage: errors.array()[0].msg, errorType: errors.array()[0].param }).end();
    }
    let checkUserExist = await User.findOne({ email: body.email });
    if (checkUserExist) {
        return res.status(400).json({
            errorMessage: "Email đã tồn tại",
            errorType: "email"
        }).end()
    }
    if (req.body) {
        const passwordHash = await bcrypt.hash(body.password, Config.SALT_ROUNDS)
        let user = {
            ...req.body,
            password: passwordHash,
            status: false,
            role: Config.MEMBER_ACCOUNT,
            typeAccount: Config.USER_ACCOUNT
        }
        await new User(user).save();
        return res.status(200).send("success").end()
    }
    return res.status(401).send("some error").end()
});
usersRouter.post("/sign-in", async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(req.body.password, user.password);
    console.log(passwordCorrect)
    if (!(user && passwordCorrect)) {
        console.log("xxx user", passwordCorrect)
        return res.status(400).json({
            error: "Tên đăng nhập hoặc mật khẩu sai"
        })
    }
    console.log("xxx id", user.id)
    const userForToken = {
        email: user.email,
        id: user.id,
    }
    console.log("xxx running continue")
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.send(token).status(200).end();
})
usersRouter.post("/check-auth", async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log(decodedToken)
    const user = await User.findById(decodedToken.id);
    const userUpgrade = await UserUpgrade.findOne({ userId: decodedToken.id })
    if (user) {
        return res.status(200).json(
            {
                message: "success",
                typeAccount: user.typeAccount,
                role: user.role,
                status: userUpgrade ? userUpgrade.status : -1,
                imagePath: userUpgrade ? userUpgrade.personImagePath : "default_user_small.png"
            }
        ).end()
    } else {
        return res.status(401).send({ message: "error" }).end()
    }
})
usersRouter.get("/user-info", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log(decodedToken)
    const user = await User.findById(decodedToken.id);
    const userUpgrade = await UserUpgrade.findOne({ userId: decodedToken.id });
    console.log("xxx userUpgrade", userUpgrade)
    if (userUpgrade) {
        return res.status(200).json({
            firstName: userUpgrade.firstName,
            lastName: userUpgrade.lastName,
            phone: userUpgrade.phone,
            cardId: userUpgrade.cardId,
            birthday: userUpgrade.birthday,
            address: userUpgrade.address,
            email: user.email
        }).end()
    } else {
        return res.status(200).json(user).end()

    }
    console.log(user)
})
usersRouter.post("/verify-account", [
], async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log("xxx req update profile", req.body);
    console.log("length", req.files[0]);
    let checkExistCardId = await UserUpgrade.findOne({ cardId: req.body.cardId });
    let checkExistPhone = await UserUpgrade.findOne({ cardId: req.body.phone });
    let email = req.body.email;

    if (checkExistCardId) {
        return res.status(400).json({ errorMessage: "Chứng minh thư đã được đăng ký", errorType: "cardId" });
    } else {
        if (checkExistPhone) {
            return res.status(400).json({ errorMessage: "Số điện thoại đã được đăng ký", errorType: "phone" });
        } else {
            let upgradeUserInfo = { ...req.body, userId: decodedToken.id, status: Config.NOT_VERIFY }
            await new UserUpgrade(upgradeUserInfo).save();
            return res.status(200).send({ message: "success" }).end()
        }

    }
})
usersRouter.post("/favorites", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id);
    return res.status(200).json(user.listFavo).end()
})
usersRouter.post("/add-favorites", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let idApartment = req.body.id;
    const apartment = await Apartment.findById(idApartment);
    if (apartment) {
        await User.findByIdAndUpdate(decodedToken.id, { $addToSet: { listFavo: idApartment } });
        return res.status(200).send("success").end()
    }
    return res.status(400).send("Bad request")
})
usersRouter.post("/remove-favorites", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let idApartment = req.body.id;
    const apartment = await RealEstate.findById(idRealEstate);
    console.log(typeof idRealEstate)
    if (apartment) {
        await User.findByIdAndUpdate(decodedToken.id, { $pull: { listFavo: idRealEstate } });
        return res.status(200).send("success").end()
    }
    return res.status(400).send("Bad request")
})
usersRouter.post("/admin-approve-account", async (req, res) => {
    console.log("xxx", req.body)
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id)
    let typeAccount = user.typeAccount;
    let userUpgrade = await UserUpgrade.findById(req.body.id);
    console.log("upgrade", userUpgrade)
    if (typeAccount === Config.ADMIN_ACCOUNT) {
        await User.findByIdAndUpdate(userUpgrade.userId, { role: Config.UPGRADED_ACCOUNT });
        let userId = await User.findById(userUpgrade.userId);
        console.log("xxx userId", userId)
        await UserUpgrade.findByIdAndUpdate(req.body.id, { status: Config.UPGRADED_ACCOUNT })
        return res.status(200).json("success").end()
    }
    return res.status(400).send("Bạn không có quyền truy cập").end()
})
usersRouter.post("/get-list-account", async (req, res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id);

    let typeAccount = user.typeAccount
    if (typeAccount && typeAccount === Config.ADMIN_ACCOUNT) {
        let userUpgrades = await UserUpgrade.find({ status: Config.NOT_VERIFY })
        console.log("xxx user upgrade", userUpgrades)
        return res.status(200).json(userUpgrades);
    }
    return res.status(400).end()
})
module.exports = usersRouter