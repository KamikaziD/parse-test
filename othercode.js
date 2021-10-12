// app.get('/', (req, res) => {
//     async function fetchData(){

//         let qString = req.body.id

//         let Person = Parse.Object.extend('Person');
//         let query = new Parse.Query(Person);
//         let person = await query.get(qString);

//         res.json(person);
//         console.log("Load Success")
//     }

//     fetchData();

// });

// app.post('/', (req, res) => {
//     async function postData(){
//         res.json(req.body)

//         let newName = req.body.name;
//         let newAge = req.body.age;
//         let newLivingCity = req.body.livingCity;

//         try 
//             { 
//                 let Person = Parse.Object.extend('Person');
//                 const person = new Person();
//                 person.set("name", newName);
//                 person.set("age", newAge);
//                 person.set("livingCity", newLivingCity);

//                 person.save()
//                 console.log("Success")

//             } catch (err) {
//                 console.log("This is my error", err)

//             }
        
//     }

//     postData();
    
// })