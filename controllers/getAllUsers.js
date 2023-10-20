import client from "./databasepg.js";
import { selectAllQuery } from "../helper/query.js";


 let getAllUsers = (req, res) => {
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

  export default getAllUsers;