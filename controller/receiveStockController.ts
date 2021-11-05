import { Request, Response, NextFunction } from "express";
import { objectLength } from "../utils/functions";
import Parse from "parse/node";

//<---GET ALL SUPPLIERS--->//

exports.getReceivedStock = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const Products = Parse.Object.extend("Products");
        const query = new Parse.Query(Products);
        query.include("supplier")
        query.include("stockOnHand");
        query.include("item")

        var productsList = new Array();

        let myObject = query.equalTo("objectId", "WxuHlbuEix");

        let myProducts = await myObject.first();
        console.log(myProducts);
        

        await query.find().then(function (results){
            for(let i in results){
                var obj = results[i];
                var id = obj.id
                var productItem = obj.get("item").get("item");
                var productDescription = obj.get("item").get("item_description");
                var supplier = obj.get("supplier").get("supplier_name");
                var stock = obj.get("stockOnHand")
                var price = obj.get("price");
                var updated = obj.get("updatedAt");
                var created = obj.get("createdAt");
                
                productsList.push({
                    Products: {
                        objectId: id,
                        item: productItem,
                        description: productDescription,
                        supplier,
                        stock,
                        pricePerKilo: price,
                        updated,
                        created, 
                    }
                    
                });
            }
            
        });

        await res.status(200).json({ success: true, message: "Suppliers returned successfully", productsList });
        

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }
};

//<---GET SUPPLIER BY ID--->//
exports.getReceivedStockById = async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        const receiveStock = Parse.Object.extend("receiveStock");
        const query = new Parse.Query(receiveStock);
        query.equalTo("objectId", req.params.id)
        query.include("product")
        query.include("product.supplier")
        query.include("product.item")
        

        await query.find().then(function (results){
            var receivedStockList = new Array();
            for(let i in results){
                var obj = results[i];
                var id = obj.id
                var productItem = obj.get("product").get("item").get("item");
                var productDescription = obj.get("product").get("item").get("item_description");

                var container = obj.get("containerNumber");
                var receivedWeight = obj.get("weight");

                var price = obj.get("product").get("price");

                var productSupplier = obj.get("product").get("supplier").get("supplier_name");
                var productSupplierCode = obj.get("product").get("supplier").get("supplier_code");

                var updated = obj.get("updatedAt");
                var created = obj.get("createdAt");
                

                receivedStockList.push({
                    recievedStock: {
                        objectId: id,
                        item: productItem,
                        description: productDescription,
                        supplier: {
                            productSupplier,
                            supplierCode: productSupplierCode,
                        },
                        
                        stock: receivedWeight,
                        container,                      
                        stockValue: price * receivedWeight,
                        updated,
                        created,  
                        
                    }
                });
                
            }
            res.status(200).json({ success: true, message: "Suppliers returned successfully", receivedStockList });
        });


        

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }

};

exports.addNewSupplier = async(req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { supplier_name, supplier_code } = req.body

    const Suppliers = Parse.Object.extend('Suppliers');
            
    const supplier = new Suppliers();

    function setSupplier(){
        try { 
            supplier.set("supplier_name", supplier_name);
            supplier.set("supplier_code", supplier_code);

        } catch (e) {
            res.status(404).json({ success: false, message: "Error setting supplier" });
            next(e);

        }
            
    };

    //<---VALIDATE DATA--->
    if (!data || objectLength(data) == 0) {
        return next(new Error);
    }

    if (!supplier_name) {
        return next(res.json({"err": "No supplier provided"}) && console.error("No supplier provided"));
    }

    if (!supplier_code) {
        return next(res.json({"err": "No supplier code provided"}) && console.error("No supplier code provided"));
    }

    //<---RUN FUNCTION THEN SAVE--->
    try { 
        await setSupplier(); 
        await supplier.save();
        res.status(200).json({ success: true, message: "Supplier has been added", data})

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err); 
    }
};

//DELETE SUPPLIER BY ID

exports.deleteSupplierById = async (req: Request, res: Response, next: NextFunction) => {
    let objectId = req.params.id;

    const Suppliers = Parse.Object.extend('Suppliers');
    const query = new Parse.Query(Suppliers);
    console.log(objectId)

    const currentSupplier = await query.get(objectId);
    await currentSupplier.destroy();

    res.status(203).json({ success: true, message: "Supplier was deleted" });

};

//DELETE SUPPLIER BY ID
exports.updateSupplier = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let { id } = req.params;
        let { supplier_name, supplier_code } = req.body;

        const Suppliers = Parse.Object.extend('Suppliers');
        const supplier = new Suppliers()

        supplier.set("id", id);        
        supplier.set("supplier_name", supplier_name);
        supplier.set("supplier_code", supplier_code);

        const updatedSupplier = await supplier.save()

        res.status(202).json({ success: true, message: "Supplier updated successfully", updatedSupplier });

    } catch (err) {
        res.status(404).json({ success: false, message: "Error setting supplier" });
        next(err);

    };
    
};
