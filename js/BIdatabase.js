/**
 * File Name: BIdatabase.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 *       Boa Im, 2023.03.21: Added codes
 */

var db;

function errorHandler(error) {
    console.error(`Error: ${error.message}`);
}

var DB = {
    createDatabase: function () {
        let name = "FeedbackDB";
        let version = "1.0";
        let displayName = "DB for FeedbackDB app";
        let size = 2 * 1024 * 1024;

        function creationCallback() {
            console.log("Success: Database created successfully");
        }

        db = openDatabase(name, version, displayName, size, creationCallback);
    },
    createTables: function () {
        function txFunction(tx) {
            var sqlType = "CREATE TABLE IF NOT EXISTS type(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";
            var sqlReview = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";

            var insert1 = "INSERT INTO type(name) SELECT ('Canadian') WHERE NOT EXISTS (SELECT id FROM type WHERE id=1);";
            var insert2 = "INSERT INTO type(name) SELECT ('Asian') WHERE NOT EXISTS (SELECT id FROM type WHERE id=2);";
            var insert3 = "INSERT INTO type(name) SELECT ('European') WHERE NOT EXISTS (SELECT id FROM type WHERE id=3);";
            var insert4 = "INSERT INTO type(name) SELECT ('Australian') WHERE NOT EXISTS (SELECT id FROM type WHERE id=4);";
            var insert5 = "INSERT INTO type(name) SELECT ('Other') WHERE NOT EXISTS (SELECT id FROM type WHERE id=5);";
            let options = [];

            function success() {
                console.log("Success: tables created successfully");
            }

            tx.executeSql(sqlType, options, success, errorHandler);
            tx.executeSql(sqlReview, options, success, errorHandler);
            tx.executeSql(insert1, options, function (){}, errorHandler);
            tx.executeSql(insert2, options, function (){}, errorHandler);
            tx.executeSql(insert3, options, function (){}, errorHandler);
            tx.executeSql(insert4, options, function (){}, errorHandler);
            tx.executeSql(insert5, options, function (){}, errorHandler);
        }

        function successTransaction() {
            console.log("Create table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            let sqlType = "DROP TABLE IF EXISTS type;";
            let sqlReview = "DROP TABLE IF EXISTS review";
            let options = [];

            function successDrop() {
                console.log("Success: tables dropped successfully");
            }

            tx.executeSql(sqlType, options, successDrop, errorHandler);
            tx.executeSql(sqlReview, options, successDrop, errorHandler);
        }

        function successTransaction() {
            console.log("Success Drop tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}