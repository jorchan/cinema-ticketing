import { purchaseTickets } from "../../../src/controllers/TicketController.js";

describe("purchaseTickets",()=>{
    test('return status 400 if no account id given to controller',()=>{
       
        const reqBody =
        {
            accountInfo:{
                id: 1,
            },
            tickets:{
                ADULT: 2,
                CHILD: 2,
                INFANT: 2
            }
        }
        try{
           
        }catch(err){
            expect()
        }
    })
})