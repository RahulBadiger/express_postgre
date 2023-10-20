import client from "./databasepg.js";
import { dbErr, unsuccessfulUpdate, updatedMessage } from "../helper/responses.js";

const updateUserById = (req, res) => {
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

  export default updateUserById
  