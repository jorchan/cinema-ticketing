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
        console.log('no account id included')
        return res.status(400).json({
            success:false,
            status:400,
            message: 'no account id included'
        })
    }
    if(!ticketsObj || Object.keys(ticketsObj).length === 0){
        console.log('no tickets being purchased')
        return res.status(400).json({
            success:false,
            status:400,
            message: 'no tickets being purchased'
        })
    }
    try{
        const ticketArr = ticketService.createTicketTypeRequest(ticketsObj);
        const ticketServiceResponse = ticketService.purchaseTickets(accountId,ticketArr);
        
        return res.status(200).json({
            success: true,
            totalPrice: ticketServiceResponse.totalPrice,
            totalSeatsReserved: ticketServiceResponse.totalSeatsReserved,
            ticketsPurchased: ticketServiceResponse.ticketTypesPurchased
        })
  
    }catch(err){
        console.error('an internal server error occured')
        const status = err.status || 500
        const message = err.message || "unkown error occured"
        return res.status(500).json({
            success:false,
            status,
            message
        })
    }

})