import { Request, Response, NextFunction } from "express";
import { objectLength } from "../utils/functions";
import Parse from "parse/node";

//<---GET ALL USERS--->//

exports.getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const Person = Parse.Object.extend('Person');
        const query = new Parse.Query(Person);
        const allUsersList = await query.findAll();

        res.status(200).json({ allUsersList });

    } catch (err) {
        res.status(404).send(res.json({ "err": "An error occurred" }))
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

        res.status(200).json({ user });

    } catch (err) {
        res.status(404).send(res.json({ "err": "An error occurred" }))
        next(err);
    }

};

exports.addNewUser = async(req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { name, age, livingCity } = req.body

    // const name: string = data.name;
    // const age: string = data.age;
    // const livingCity: string = data.livingCity;

    const Person = Parse.Object.extend('Person');
            
    const person = new Person();

    function setUser(){
        try { 
            person.set("name", name);
            person.set("age", age);
            person.set("livingCity", livingCity);

        } catch (e) {
            console.log("Error setting new user ", e);
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
        res.status(200).send(data);

    } catch (err) {
        res.status(404).send(res.json({ "err": "An error occurred" }));
        next(err); 
    }
    
    
    console.log("Save Successful")
};