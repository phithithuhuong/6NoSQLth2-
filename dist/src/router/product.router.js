"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const product_model_1 = require("../schemas/product.model");
const upload = (0, multer_1.default)();
productRouter.get('/create', (req, res) => {
    res.render('create');
});
productRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const productNew = new product_model_1.Product(req.body);
        const products = await productNew.save();
        if (products) {
            res.render('success');
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
productRouter.get('/list', async (req, res) => {
    try {
        const products = await product_model_1.Product.find();
        res.render('list', { products: products });
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.default = productRouter;
//# sourceMappingURL=product.router.js.map