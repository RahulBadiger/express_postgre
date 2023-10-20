import client from "./databasepg.js";
import { getRecordByIdQuery } from "../helper/query.js";
import { dbErr, idNotFound } from "../helper/responses.js";


 let getUserById = (req, res) => {
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

  export default getUserById