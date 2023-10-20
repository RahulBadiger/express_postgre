import { getRecordByIdQuery } from "../helper/query";
import { dbErr, unsuccessfulUpdate, updatedMessage } from "../helper/responses";
import client from "./databasepg";


const partialUpdate = (req, res) => {
  const id = req.params["id"];
  client.query(getRecordByIdQuery + `'${id}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.rowCount === 0) {
      res.status(400).send(unsuccessfulUpdate);
    } else {
      const firstname = req.body.firstname || result.rows[0].firstname;
      const lastname = req.body.lastname || result.rows[0].lastname;
      const location = req.body.location || result.rows[0].location;


      client.query(
        `UPDATE users 
           SET firstname = '${firstname}' ,lastname = '${lastname}',location = '${location}'
           WHERE id = '${id}'`,
        (err, result) => {
          if (err) {
            res.status(500).send(dbErr);
          } else if (result.rowCount !== 0) {
            res.send(updatedMessage);
          } else {
            res.status(400).send(unsuccessfulUpdate);
          }
        }
      );
    }
  });
  client.end;
};

export default partialUpdate;
