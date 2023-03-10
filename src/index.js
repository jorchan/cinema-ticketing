import express from "express";
import { purchaseTickets } from "./controllers/TicketController.js";

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("hello world!");
});

router.post('/tickets',purchaseTickets);

export default router;
