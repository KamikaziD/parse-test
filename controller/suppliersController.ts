import { Request, Response, NextFunction } from "express";
import { objectLength } from "../utils/functions";
import Parse from "parse/node";

//<---GET ALL SUPPLIERS--->//

exports.getAllSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Suppliers = Parse.Object.extend('Suppliers');
        const query = new Parse.Query(Suppliers);
        const allSuppliersList = await query.findAll();

        res.status(200).json({ success: true, message: "Suppliers returned successfully", allSuppliersList });

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }
};

//<---GET SUPPLIER BY ID--->//
exports.getSupplierById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const Suppliers = Parse.Object.extend('Suppliers');
        const query = new Parse.Query(Suppliers);
        console.log(req.params.id)
        query.equalTo('objectId', req.params.id);

        const supplier = await query.find();

        res.status(200).json({ success: true, message: "Supplier returned successfully", supplier });

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
