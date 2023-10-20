import express  from "express";
import addUser from "../controllers/addUser.js";
import deleteUserById from "../controllers/deleteUserById.js";
import getAllUsers from "../controllers/getAllUsers.js";
import getUserById from "../controllers/getUserById.js";
import updateUserById from "../controllers/updateUserById.js";

const router=express.Router();

router.get('/get',getAllUsers)

router.get('/getUser/:id',getUserById)

router.post('/create',addUser)

router.delete('/deleteUser/:id',deleteUserById)

router.put('/updateUser/:id',updateUserById)

export default router;