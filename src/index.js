import express from "express";
import { purchaseTickets } from "./controllers/TicketController.js";

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("hello world!");
});

router.post('/tickets',purchaseTickets);

router.all('*', (req,res)=>{
    res.status(404).json({
        status: 404,
        message:"not found"
    })
})

export default router;
