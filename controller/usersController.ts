import { Request, Response, NextFunction } from "express";
import { objectLength } from "../utils/functions";
import Parse from "parse/node";

//<---GET ALL USERS--->//

exports.getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const Person = Parse.Object.extend('Person');
        const query = new Parse.Query(Person);
        const allUsersList = await query.findAll();

        res.status(200).json({ success: true, message: "Users returned successfully", allUsersList });

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }
};

//<---GET USER BY ID--->//
exports.getUserById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const Person = Parse.Object.extend('Person');
        const query = new Parse.Query(Person);
        console.log(req.params.id)
        query.equalTo('objectId', req.params.id);

        const user = await query.find();

        res.status(200).json({ success: true, message: "User returned successfully", user });

    } catch (err) {
        res.status(404).json({ success: false, message: "An error occurred" });
        next(err);
    }

};

exports.addNewUser = async(req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { name, age, livingCity } = req.body

    const Person = Parse.Object.extend('Person');
            
    const person = new Person();

    function setUser(){
        try { 
            person.set("name", name);
            person.set("age", age);
            person.set("livingCity", livingCity);

        } catch (e) {
            res.status(404).json({ success: false, message: "Error setting user" });
            next(e);

        }
            
    };

    //<---VALIDATE DATA--->
    if (!data || objectLength(data) == 0) {
        return next(new Error);
    }

    if (!name) {
        return next(res.json({"err": "No name provided"}) && console.error("No name provided"));
    }

    if (!age) {
        return next(res.json({"err": "No age provided"}) && console.error("No age provided"));
    }

    if (!livingCity) {
        return next(res.json({"err": "No city provided"}) && console.error("No city provided"));
    }
    //<---RUN FUNCTION THEN SAVE--->
    try { 
        await setUser(); 
        await person.save();
        res.status(200).json({ success: true, message: "User has been added", data})

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
