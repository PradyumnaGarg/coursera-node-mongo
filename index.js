const MongoClient = require('mongodb');
const assert = require('assert');
const dbops = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    console.log('Connect correctly to server');
    const db = client.db(dbname);

    dbops.insertDocument(db, {name: "Pizza", description: "Delicious"}, 
        "dishes")
        .then((result) => {
            console.log("Inserted Document:\n", result.ops);
    
            return dbops.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dbops.updateDocument(db, {name: "Pizza"}, {description: "Awesome"}, "dishes")
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dbops.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("Updated Doument: ", docs);
                        
            return db.dropCollection("dishes")
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);               
             
            return client.close();
        })
        .catch((err) => console.log(err));
    })
.catch((err) => console.log(err));