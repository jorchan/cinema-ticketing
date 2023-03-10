import TicketService from "../services/TicketService.js";
// {
//     accountInfo:{
//         id: 1,
//     },
//     tickets:{
//         ADULT: 2,
//         CHILD: 2,
//         INFANT: 2
//     }
// }
const ticketService = new TicketService();

export const purchaseTickets = ((req,res)=>{
    
    const accountId = req.body.accountInfo?.id;
    const ticketsObj = req.body.tickets;

    if(!accountId){
        return res.status(400).send('no account id included')
    }
    if(!ticketsObj || Object.keys(ticketsObj).length === 0){
        return res.status(400).send('no tickets being purchased')
    }
    try{
        const ticketArr = ticketService.createTicketTypeRequest(ticketsObj);
        const ticketServiceResponse = ticketService.purchaseTickets(accountId,ticketArr);
        
        return res.status(200).json({
            success: true,
            totalPrice: ticketServiceResponse.totalPrice,
            totalSeatsReserved: ticketServiceResponse.totalSeatsReserved,
        })
  
    }catch(err){
        const status = err.status || 500
        const message = err.message || "unkown error occured"
        return res.status(500).json({
            success:false,
            status,
            message

        })
    }

})