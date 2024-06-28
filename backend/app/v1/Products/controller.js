import Product from "./model.js";

export const getProducts = async(req, res)=>{
    try {
        const response = await Product.findAll({
            attributes: ['uuid','name','price']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: "gagal menampilkan data"})
    }

}

export const getProductById = async(req, res)=>{
    try {
        const response = await Product.findOne({
            attributes: ['uuid','name','price'],
            where:{
                uuid: req.params.id
            }
        });
        res.response(200).json(response);
    } catch (error) {
        res.response(500).json({msg:"Gaagal menampilkan one data"})
    }

}

export const createProduct = async(req, res)=>{
    const {name, price, userId} = req.body;

    try {
        await Product.create({
            name: name,
            price: price,
            userId: userId
        });
        res.status(201).json({msg:"add Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}

export const updateProduct = (req, res)=>{

}

export const deleteProduct = (req, res)=>{

}