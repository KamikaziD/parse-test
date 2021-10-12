import { Request, Response, NextFunction } from "express";
import { objectLength } from "../utils/functions";
import Parse from "parse/node";
import { json } from "stream/consumers";

//<---GET ALL USERS--->//
export async function usersController(req: Request, res: Response, next: NextFunction) {
        const Person = Parse.Object.extend('Person');
        
        const query = new Parse.Query(Person);

        await query.findAll().then((data) => {

            let usersList = [];

            if (data.length > 0) {
                for (let index = 0; index < data.length; index++) {
                    const user = data[index];
                    const visibleContent = {
                        "userId": user.id,
                        "name": user.get("name"),
                        "age": user.get("age"),
                        "livingCity": user.get("livingCity")
                    }

                    usersList.push(visibleContent);
                }
            }
            res.status(200).send(usersList);

        }).catch((e) => {
            console.log("Error getting users ", e);
            next(e);
        })
    

};

//<---GET USER BY ID--->//
export async function userController(req: Request, res: Response, next: NextFunction) {
    let userQuery = req.body.id;

    const Person = Parse.Object.extend('Person');
    
    const query = new Parse.Query(Person);

    await query.get(userQuery).then((Person) => {

        res.status(200).json(Person);
        console.log("Load Success");

    }).catch((e) => {
        console.log("Error getting user ", e);
        next(e);
    })

};

//<---POST NEW USER--->//
export async function addUserController(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        const name: string = data.name;
        const age: string = data.age;
        const livingCity: string = data.livingCity;

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

        } catch (e) { 
            next(e); 
        }
        
        
        console.log("Save Successful")

};