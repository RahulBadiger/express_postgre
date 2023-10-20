import dotenv from 'dotenv';
dotenv.config();
import pg from  "pg";

let pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "sql",
  database: "StudentDB"
});

import {
  selectAllQuery,
  insertQuery,
  getRecordByIdQuery,
  deleteQuery,
} from "../helper/query.js";

import { updatedDate, createdDate } from "../helper/cddate.js";
console.log(updatedDate);

import {
  primaryKeyViolation,
  insertSuccessful,
  idNotFound,
  dbErr,
  unsuccessfulUpdate,
  updatedMessage,
  deleteMessage,
} from "../helper/responses.js";

const getAllRecords = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM datasets");
    console.log(result);
    if (result.err) {
      res.status(500).send({ error: "database error", status: 500 });
    } else if (result.rowCount === 0) {
      res.status(204).send();
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    res.status(500).send({ error: "database error", status: 500 });
  }
};

const getRecordById = async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await pool.query(getRecordByIdQuery + `'${id}'`);
    if (result.err) {
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
  } catch (error) {
    res.status(500).send(dbErr);
  }
};

const addRecord = async (req, res) => {
  const id = req.body.id;
  const dataschema = req.body.dataschema;
  const routerconfig = req.body.routerconfig;
  const status = req.body.status;
  const createdBy = req.body.createdBy;
  const updatedBy = req.body.updatedBy;

  // Parsing the JSON values to string
  const dataSchema = JSON.stringify(dataschema);
  const routerConfig = JSON.stringify(routerconfig);

  try {
    const selectResult = await pool.query(getRecordByIdQuery + `'${id}'`);
    if (selectResult.rowCount === 0) {
      const result = await pool.query(
        insertQuery +
          `('${id}','${dataSchema}','${routerConfig}','${status}','${createdBy}','${updatedBy}','${createdDate}','${updatedDate}')`
      );
      if (result.error) {
        res.status(500).send(dbErr);
      } else {
        res.status(201).send(insertSuccessful);
      }
    } else {
      res.status(400).send(primaryKeyViolation);
    }
  } catch (error) {
    res.status(500).send(dbErr);
  }
};

const deleteById = async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await pool.query(deleteQuery + `'${id}'`);
    if (result.err) {
      res.status(500).send(dbErr);
    } else if (result.rowCount === 0) {
      res.status(400).send(idNotFound);
    } else {
      res.send(deleteMessage);
    }
  } catch (error) {
    res.status(500).send(dbErr);
  }
};

const updateRecord = async (req, res) => {
  const id = req.params["id"];
  const dataschema = req.body.dataschema;
  const routerconfig = req.body.routerconfig;
  // Parsing the JSON values to string
  const dataSchema = JSON.stringify(dataschema);
  const routerConfig = JSON.stringify(routerconfig);
  const status = req.body.status;
  const updatedBy = req.body.updatedBy;

  try {
    const result = await pool.query(
      `UPDATE datasets 
       SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
       WHERE id = '${id}'`
    );
    if (result.err) {
      res.status(500).send(dbErr);
    } else if (result.rowCount !== 0) {
      res.send(updatedMessage);
    } else {
      res.status(400).send(unsuccessfulUpdate);
    }
  } catch (error) {
    res.status(500).send(dbErr);
  }
};

const updateByPatch = async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await pool.query(getRecordByIdQuery + `'${id}'`);
    if (result.err) {
      console.log(result.err);
    } else if (result.rowCount === 0) {
      res.status(400).send(unsuccessfulUpdate);
    } else {
      const dataschema = req.body.dataschema || result.rows[0].data_schema;
      const routerconfig = req.body.routerconfig || result.rows[0].router_config;
      const status = req.body.status || result.rows[0].status;
      const updatedBy = req.body.updatedBy || result.rows[0].updated_by;

      // Parsing the JSON values to string
      const dataSchema = JSON.stringify(dataschema);
      const routerConfig = JSON.stringify(routerconfig);

      const responseResult = await pool.query(
        `UPDATE datasets 
             SET data_schema = '${dataSchema}' ,router_config = '${routerConfig}',status = '${status}' ,updated_by = '${updatedBy}',updated_date = '${updatedDate}' 
             WHERE id = '${id}'`
      );
      if (responseResult.err) {
        res.status(500).send(dbErr);
      } else if (responseResult.rowCount !== 0) {
        res.send(updatedMessage);
      } else {
        res.status(400).send(unsuccessfulUpdate);
      }
    }
  } catch (error) {
    res.status(500).send(dbErr);
  }
};

export default  {
  getAllRecords,
  getRecordById,
  addRecord,
  deleteById,
  updateRecord,
  updateByPatch,
};

export function pool(pool,arg1, arg2) {
    throw new Error("Function not implemented.");
}

