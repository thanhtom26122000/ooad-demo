const apartmentRouter = require("express").Router()
const { getTokenFrom } = require("../../utils");
const Apartment = require("../models/apartment");
const jwt = require('jsonwebtoken');
const { default: Config } = require("../../config");
const User = require("../models/user");
const { check, validationResult, body } = require("express-validator");
const UserUpgrade = require("../models/userupgrade");
apartmentRouter.get("/get-list-landingpage", async (req, res) => {
    let listApartment = await Apartment.find({ isApprove: Config.APPROVED }).sort({ createTime: -1 }).limit(9);
    return res.status(200).json(listApartment).end()
})
apartmentRouter.post("/get-list-favorites", async (req, res) => {
    const token = getTokenFrom(req)
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        let user = await User.findById(decodedToken.id);
        let listFavo = [...user.listFavo]
        console.log(listFavo)
        let result = []
        if (listFavo.length > 0) {
            result = await Apartment.find({ _id: { $in: listFavo } })
            // result = await Apartment.findById("609865d4dd968343448da43c");

            console.log("xxx resuilt :", result)
        }
        return res.status(200).json(result).end()
    }
    return res.status(400).end()
})
apartmentRouter.post("/get-list-property", async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let listProperty = await Apartment.find({ userId: decodedToken.id })
    return res.status(200).json(listProperty).end()
})
apartmentRouter.post("/add-property", [
    check("title", "Tiêu đề không được bỏ trống").isString().isLength({ min: 1 }),
    check("state", "Tỉnh không được bỏ trống").isString().isLength({ min: 1 }),
    check("district", "Quận/huyện không được bỏ trống").isString().isLength({ min: 1 }),
    check("description", "Miêu tả không được bỏ trống").isString().isLength({ min: 1 }),
    check("pricePer", "Tính theo không được bỏ trống").isString().isLength({ min: 1 }),
    check("addressDetail", "Địa chỉ chi tiết không được bỏ trống").isString().isLength({ min: 1 }),
    check("size", "Diện tích không được bỏ trống").isString().isLength({ min: 1 }),
    check("bedroom", "Số phòng ngủ không được bỏ trống").isString().isLength({ min: 1 }),
    check("bathroom", "Số phòng tắm không được bỏ trống").isString().isLength({ min: 1 }),
    check("price").custom(val => {
        if (val.length === 0) {
            throw new Error("Giá không được bỏ trống")
        }
        if (isNaN(parseInt(val))) {
            throw new Error("Giá phải là chữ số")
        }
        return true;
    }),
    // check("title", "Tiêu đề không được bỏ trống").isString().isLength({ min: 1 }),

], async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const errors = validationResult(req);
    console.log(req.body.price, typeof req.body.price)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorMessage: errors.array()[0].msg, errorType: errors.array()[0].param }).end();
    }
    let user = await User.findById(decodedToken.id)
    let role = user.role;
    if (req.files && req.files.length < 3) {
        return res.status(400).send({ errorMessage: "Cần ít nhất 3 ảnh", errorType: "image" })
    } else {
        let arrImagePath = [];
        req.files.forEach(el => {
            arrImagePath.push("/images/" + el.filename)
        })
        let apartment = {
            ...req.body,
            imagePath: arrImagePath,
            status: "Chưa được cho thuê",
            userId: decodedToken.id,
            isApprove: Config.WAIT_APPROVE,
            createTime: new Date().getTime(),
            expiredDate: req.body.date
        }
        await new Apartment(apartment).save()
        return res.status(200).send("success").end()
    }
})
apartmentRouter.post("/get-property", async (req, res) => {
    let id = req.body.id;
    let apartment = (await Apartment.findById(id)).toJSON();
    let user = await UserUpgrade.findOne({ userId: apartment.userId });
    console.log("xxxx user", user.firstName)
    console.log("xxxx apartment", apartment)

    if (apartment) {
        return res.status(200).send({
            ...apartment,
            phone: user ? user.phone : "",
            fullname: user.firstName + " " + user.lastName
        }).end()
    }
    return res.status(400).end()
})
apartmentRouter.post("/get-list-not-approve", async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id)
    let typeAccount = user.typeAccount;
    if (typeAccount === Config.ADMIN_ACCOUNT) {
        let apartments = await Apartment.find({ $or: [{ isApprove: Config.WAIT_APPROVE }, { isApprove: Config.NOT_APPROVE }] })
        return res.status(200).json(apartments).end()
    }
    return res.status(400).send("Bạn không có quyền truy cập").end()
})
apartmentRouter.post("/admin-approve-property", async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id)
    let typeAccount = user.typeAccount;
    if (typeAccount === Config.ADMIN_ACCOUNT) {
        await Apartment.findByIdAndUpdate(req.body.id, { isApprove: Config.APPROVED })
        return res.status(200).json("success").end()
    }
    return res.status(400).send("Bạn không có quyền truy cập").end()
})
apartmentRouter.post("/admin-reject-property", async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id)
    let role = user.role;
    console.log(role)
    if (role === Config.ADMIN_ACCOUNT) {
        await Apartment.findByIdAndUpdate(req.body.id, { status: Config.NOT_APPROVE })
        return res.status(200).json("success").end()
    }
    return res.status(400).send("Bạn không có quyền truy cập").end()
})

apartmentRouter.post("/search-property", async (req, res) => {
    let body = { ...req.body };
    let query = {}
    let price
    for (let item in body) {
        if (body[item] && item !== "size") {
            query = {
                ...query,
                [item]: body[item]
            }
        }
    }
    if (query.price) {
        price = parseInt(query.price) * 1000000;
    }
    let minSize = 0;
    let maxSize;
    if (req.body.size) {
        let temp = req.body.size;
        if (temp.search("-") === -1) {
            minSize = 50;
        } else {
            minSize = parseInt(temp.substring(3, 5));
            maxSize = parseInt(temp.substring(8, 10))
        }
        console.log("xxx ", minSize, maxSize)
    }
    console.log("xxx", query)
    let listApartments = await Apartment.find({ ...query, isApprove: Config.APPROVED, price: price ? { $gte: price } : { $gte: 0 }, size: maxSize ? { $gte: minSize, $lte: maxSize } : { $gte: minSize } })
    if (listApartments) {
        console.log("xxx listApartments", listApartments)
        return res.status(200).json(listApartments).end()
    }
    return res.status(400).end()
})
apartmentRouter.post("/adjust-apartment", async (req, res) => {
    console.log("xxxx", req.body.id)
    let apartment = await Apartment.findById(req.body.id);
    if (apartment) {
        return res.status(200).json(apartment).end();
    } else {
        return res.status(400).end()
    }
})
apartmentRouter.post("/remove-apartment", async (req, res) => {
    if (req.body.id) {
        await Apartment.findByIdAndDelete(req.body.id);
        return res.status(200).send("success").end()
    }
    return res.status(400).end()
})
apartmentRouter.post("/update-apartment", async (req, res) => {
    if (req.body.id) {
        await Apartment.findByIdAndUpdate(req.body.id, req.body.property);
        return res.status(200).send("success").end()

    }
    return res.status(400).end()
})
module.exports = apartmentRouter