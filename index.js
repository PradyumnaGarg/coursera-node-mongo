const MongoClient = require('mongodb');
const assert = require('assert');
const dbops = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connect correctly to server');

    const db = client.db(dbname);

    dbops.insertDocument(db, {name: "Pizza", description: "Delicious"}, 
        "dishes", (result) => {
            console.log("Inserted Document:\n", result.ops);
            
            dbops.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dbops.updateDocument(db, {name: "Pizza"}, {description: "Awesome"}, "dishes", (result) => {
                    console.log("Updated Document:\n", result.result);

                    dbops.findDocuments(db, "dishes", (docs) => {
                        console.log("Updated Doument: ", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);
                            
                            client.close();
                        });
                    });
                });
            });

    });
    
});