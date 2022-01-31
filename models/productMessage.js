import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
        lookupCode: String,
        count: Number,
        // createdOn: {
        //     type: Date,
        //     default: new Date()
        // }
});

const ProductMessage = mongoose.model('ProductMessage', productSchema);

export default ProductMessage;