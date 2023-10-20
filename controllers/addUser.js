import client from "./databasepg.js";
import { v4 as uuidv4 } from "uuid";

const addUser = (req, res) => {
  const userId = uuidv4(); // Generate a unique userId
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const location = req.body.location;
  const values = [userId, firstname, lastname, location];

  try {
    // Checking if the user already exists by userId
    client.query('SELECT id FROM users WHERE id = $1', [userId], (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Database error");
      } else if (result.rows.length === 0) {
        // The user does not exist; insert the record
        const insertQuery = 'INSERT INTO users (id, firstname, lastname, location) VALUES ($1, $2, $3, $4)';
        client.query(insertQuery, values, (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send("Error while inserting the record");
          } else {
            res.status(201).send("Record inserted successfully");
          }
        });
      } else {
        res.status(400).send("Primary key violation");
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

export default addUser
