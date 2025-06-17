const Product = require('../models/Product');

exports.getAllProducts= async (req,res)=>{
    const products = await Product.find();
    res.json(products);
}

exports.createProduct= async (req,res)=>{
    const { name,description,features}=req.body;
    const product = new Product({name,description,features});
    await product.save();
    res.status(200),json(product);
};

exports.updateProduct = async (req,res)=>{
    const {id} = req.params;
    const {name,description,features}=req.body;
    const product = await Product.findByIdAndUpdate(id,{name,description,features},{new:true});
    res.json(product);
}

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
};