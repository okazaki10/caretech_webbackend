const Product = require('../model/product')
const fs = require("fs")
const PATH = "public/images/product/"
const index = async (req, res) => {
    try {
        const product = await Product.find()
        res.json({ success: true, message: '', data: product })
    } catch (err) {
        res.status(500).json({ success: false, message: '', data: err })
    }
}

const insertProduct = async (req, res) => {
    try {
        var fileName = ""
        if (req.body.base64_image) {
            const date = new Date()
            const isoString = date.toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-')
            fileName = PATH + isoString + date.getMilliseconds() + "_" + req.body.name + ".jpg"
            fs.writeFile(fileName, req.body.base64_image, 'base64', function (err) {
                console.log(err);
                fileName = "/images/product/empty.png"
            });
        } else {
            fileName = "/images/product/empty.png"
        }
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            sku: req.body.sku,
            stock: req.body.stock,
            category: req.body.category,
            price: req.body.price,
            image_url: fileName.replace('public', '')
        })
        const savedPost = await product.save()

        res.json({ success: true, message: '', data: savedPost })
    } catch (err) {
        res.status(500).json({ success: false, message: '', data: err })
    }
}

module.exports = {
    index: index,
    insertProduct: insertProduct,
}
