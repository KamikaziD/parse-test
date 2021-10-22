import { Request, Response, NextFunction } from "express";
import { objectLength } from "../utils/functions";
import Parse from "parse/node";

//<---GET ALL PRODUCT CATAGORIES--->//

exports.getAllProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ProductCatagory = Parse.Object.extend('ProductCatagory');
        const query = new Parse.Query(ProductCatagory);
        const allProductCatagoriesList = await query.findAll();

        res.status(200).json({ success: true, message: "Product Catagories returned successfully", allProductCatagoriesList });

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }
};

//<---GET PRODUCT CATAGORY BY ID--->//
exports.getProductCatagoryById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const ProductCatagory = Parse.Object.extend('ProductCatagory');
        const query = new Parse.Query(ProductCatagory);
        console.log(req.params.id)
        query.equalTo('objectId', req.params.id);

        const productcatagory = await query.find();

        res.status(200).json({ success: true, message: "Product Catagory returned successfully", productcatagory });

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }

};

exports.addNewProductCatagory = async(req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { product_catagory, product_description } = req.body

    const ProductCatagory = Parse.Object.extend('ProductCatagory');
            
    const productcatagory = new ProductCatagory();

    function setProductCatagory(){
        try { 
            productcatagory.set("product_catagory", product_catagory);
            productcatagory.set("product_description", product_description);

        } catch (e) {
            res.status(404).json({ success: false, message: "Error setting product catagory" });
            next(e);

        }
            
    };

    //<---VALIDATE DATA--->
    if (!data || objectLength(data) == 0) {
        return next(new Error);
    }

    if (!product_catagory) {
        return next(res.json({"err": "No product catagory provided"}) && console.error("No product catagory provided"));
    }

    if (!product_description) {
        return next(res.json({"err": "No product description provided"}) && console.error("No product description provided"));
    }

    //<---RUN FUNCTION THEN SAVE--->
    try { 
        await setProductCatagory(); 
        await productcatagory.save();
        res.status(200).json({ success: true, message: "Product Catagory has been added", data})

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err); 
    }
};

exports.deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    let objectId = req.params.id;

    const Person = Parse.Object.extend('Person');
    const query = new Parse.Query(Person);
    console.log(objectId)

    const currentUser = await query.get(objectId);
    await currentUser.destroy();

    res.status(203).json({ success: true, message: "User was deleted" });

};

exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let { id } = req.params;
        let { name, age, livingCity } = req.body;

        const User = Parse.Object.extend('Person');
        const user = new User()

        user.set("id", id);        
        user.set("name", name);
        user.set("age", age);
        user.set("livingCity", livingCity);

        const updatedUser = await user.save()

        res.status(202).json({ success: true, message: "User updated successfully", updatedUser });

    } catch (err) {
        res.status(404).json({ success: false, message: "Error setting user" });
        next(err);

    };
    
};
