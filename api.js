var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "tabledb"
});

// var newReso = {
//   name: $("#inputName").val().trim(),
//   number: $("#inputPhone").val().trim(),
//   email: $("#inputEmail").val().trim(),
// };

// $("#add-btn").on("click", function (event) {
//   event.preventDefault();

//   $.post("/api/reservations", newReso)
//     .then(function (data) {
//       console.log(data);
//       alert("Adding reservation...");
//     });

//     dbConnect();

// });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // addTable();
  });



function addTable() {
  console.log("Inserting customers in DB...\n");
  var query = connection.query(
    "INSERT INTO customer_info SET ?",
    {
      customerName: newReso.name,
      customerEmail: newReso.email,
      phoneNumber: newReso.number
    },
    function (err, res) {
      console.log(res.affectedRows + " table added!");
      // Call updateProduct AFTER the INSERT completes
      //   updateProduct();
      readDB();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

function readDB() {
  console.log("Selecting all customers...\n");
  connection.query("SELECT * FROM customer_info", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    // connection.end();
  });
}

module.exports = {
  readDB: readDB
}
