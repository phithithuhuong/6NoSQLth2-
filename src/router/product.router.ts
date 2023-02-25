import {Router} from "express";
const productRouter = Router();
import multer from "multer";
import {Product} from "../schemas/product.model";
const upload = multer();
productRouter.get('/create',(req, res)=>{
    res.render('create')
});
productRouter.post('/create',upload.none(), async (req, res) => {
    try{
        const productNew = new Product(req.body);
        const products = await productNew.save();
        if(products) {
            res.render('success');
        }
    }catch (err){
        console.log(err.message)
    }
});
productRouter.get('/list',async (req, res) => {
    try{
        const products = await Product.find();
        res.render('list',{products: products});

    }catch (err){
        console.log(err.message)
    }
});
export default productRouter;