/**
 * File Name: BIDAL.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 *       Boa Im, 2023-03-21: Added codes
 */

var Review={
    insert: function(options, callback){
        function txFunction(tx) {

            let sql = "INSERT INTO review(businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options, callback){
        function txFunction(tx) {

            let sql = "UPDATE review SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options, callback){
        function txFunction(tx) {

            let sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function txFunction(tx) {

            let sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function txFunction(tx) {

            let sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {
    selectAll: function(options, callback){
        function txFunction(tx) {

            let sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: selectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}