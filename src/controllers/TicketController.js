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
export const purchaseTickets = ((req,res)=>{
    const accountId = req.body.accountInfo?.id;
    const ticketsObj = req.body.tickets;

    if(!accountId){
        res.status(400).send('no account id included')
    }
    if(!ticketsObj || Object.keys(ticketsObj).length === 0){
        res.status(400).send('no tickets being purchased')
    }
    try{
        
    }catch(err){

    }

})