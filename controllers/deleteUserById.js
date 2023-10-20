import client from "./databasepg.js";
import { deleteQuery } from "../helper/query.js";
import { dbErr, deleteMessage, idNotFound } from "../helper/responses.js";

 let deleteUserById = (req, res) => {
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
  
  export default deleteUserById;