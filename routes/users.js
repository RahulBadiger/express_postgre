import express  from "express";
import addUser from "../controllers/addUser.js";
import deleteUserById from "../controllers/deleteUserById.js";
import getAllUsers from "../controllers/getAllUsers.js";
import getUserById from "../controllers/getUserById.js";
import updateUserById from "../controllers/updateUserById.js";
import dataValidation from "../validation/userValidation.js"
import partialUpdate from "../controllers/partialUpdate.js";

const router=express.Router();

router.get('/get',getAllUsers)

router.get('/getUser/:id',getUserById)

router.post('/create',dataValidation,addUser)

router.delete('/deleteUser/:id',deleteUserById)

router.put('/updateUser/:id',dataValidation,updateUserById)

router.patch('/patchUser/:id',partialUpdate)

export default router;