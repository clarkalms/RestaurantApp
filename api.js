const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "tabledb"
});

function addReservations(request, response) {
  connection.connect(function (error) {
    connection.query("INSERT INTO customer_info SET ?",
      {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        phone_number: request.body.phone_number
      },
      // TODO: Understand this code... Spread operator vs. rest parameters?
      function (error, rows) {
        let reservation = { ...request.body };
        reservation.customer_id = rows.insertId;
        response.json(reservation);
      });
  });
};

function getReservations(request, response) {
  connection.connect(function (error) {
    connection.query("SELECT * FROM customer_info", function (error, rows) {
      response.json(rows)
    });
  });
};

function clearReservations(request, response){
  connection.connect(function(error){
    connection.query("TRUNCATE TABLE customer_info", function(error, rows){
      response.json({
        'message': 'reservations cleared.'
      });
    });
  });
};

module.exports = {
  getReservations: getReservations,
  addReservations: addReservations,
  clearReservations: clearReservations
};
