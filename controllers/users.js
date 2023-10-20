import client from "./databasepg.js";
import { v4 as uuidv4 } from "uuid";
import {
  deleteQuery,
  getRecordByIdQuery,
  insertingQuery,
  selectAllQuery,
} from "../helper/query.js";
import { dbErr, deleteMessage, idNotFound, unsuccessfulUpdate, updatedMessage } from "../helper/responses.js";

export let getUsers = (req, res) => {
  client.query(selectAllQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "database error", status: 500 });
    } else if (result.rowCount === 0) {
      const resultObjByID = {
        message: `the record associated with the id '${id}' is`,
        record: result.rows,
      };
      res.send(resultObjByID);
    } else {
      res.send(result.rows);
    }
  });
  client.end;
};

export let getUser = (req, res) => {
  const id = req.params["id"];
  client.query(getRecordByIdQuery + `'${id}'`, (err, result) => {
    if (err) {
      res.status(500).send(dbErr);
    } else if (result.rowCount !== 0) {
      const resultObjByID = {
        message: `the record associated with the id '${id}' is`,
        record: result.rows,
      };
      res.send(resultObjByID);
    } else {
      res.status(400).send(idNotFound);
    }
  });
  client.end;
};

export const postUsers = (req, res) => {
  const userId = uuidv4(); // Generate a unique userId
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const location = req.body.location;
  const values = [userId, firstname, lastname, location];

  try {
    // Check if the user already exists by userId
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

export let deleteUser = (req, res) => {
  const id = req.params["id"];

  client.query(deleteQuery + `'${id}'`, (err, result) => {
    if (err) {
      res.status(500).send(dbErr);

    } else if (result.rowCount === 0) {
      res.status(400).send(idNotFound);
    } else {
      res.send(deleteMessage);
    }
  });
  client.end;
};


export const updateUser = (req, res) => {
  const id = req.params["id"];
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const location = req.body.location;

  client.query(
    `UPDATE users 
       SET firstname = '${firstname}', lastname = '${lastname}', location = '${location}'
       WHERE id = '${id}'`,
    (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).send(dbErr);
      } else if (result.rowCount !== 0) {
        res.send(updatedMessage);
      } else {
        res.status(400).send(unsuccessfulUpdate);
      }
    }
  );
  client.end;
};

