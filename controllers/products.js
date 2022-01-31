import ProductMessage from "../models/productMessage.js"
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try{
        const productMessages =  await ProductMessage.find();

        res.status(200).json(productMessages);
    } catch (error){
        res.status(404).json({message: error.message});
        }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    const newProduct = new ProductMessage(product);

    try{
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    console.log("Delete Product")

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No product with that id");

    await ProductMessage.findByIdAndRemove(id);

    res.json({ message: 'Product deleted'});
}

export const updateProduct = async (req,res) => {
    console.log("Updateing Product");
    const {id: _id} = req.params;
    const productBody = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No product with that id');

    const updateUser = await ProductMessage.findByIdAndUpdate(_id, productBody, {new:true});

    res.json(updateUser);
}