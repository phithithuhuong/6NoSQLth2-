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
        let limit:number;
        let offset: number;
        if(!req.query.limit||!req.query.limit){
            limit = 3;
            offset =0 ;
        } else {
            limit = parseInt(req.query.limit as string)
            offset = parseInt(req.query.offset as string)
        }
        //limit(number): Số bản ghi tối đa được lấy
       // skip(number): Lấy bản ghi từ vị trí number (Bỏ qua các bản ghi trước đó).
        const products = await Product.find().limit(limit).skip(limit*offset);
        res.render('list',{products: products});

    }catch (err){
        console.log(err.message)
    }
});
export default productRouter;