import InvalidPurchaseException from "../../../src/services/lib/InvalidPurchaseException";
import TicketService from "../../../src/services/TicketService";

describe("TicketService", ()=>{
    describe("purchaseTickets", ()=>{
        test('return an error if passed a unsupported ticket type',() =>{
            const ticketService = new TicketService();
            const obj = {
                tickets:{
                  adult: 1,
                  child: 1,
                  infant: 1
                }
              }

            try{
                ticketService.purchaseTickets(1,obj)
            }catch(err){
                expect(err).toBeInstanceOf(InvalidPurchaseException)
                expect(err.message).toEqual("ticket type is not valid")
            }  
        })  
    })

    describe("isTicketTypesValid", ()=>{
        test('return an false if passed an empty ticket type',() =>{
            const ticketService = new TicketService();
            const obj = {
                tickets:{
                }
              }
            
            expect(ticketService.isTicketTypesValid(obj)).toEqual(false);
        })  
        test('return an error if passed a incorrect ticket type',() =>{
            const ticketService = new TicketService();
            const obj = {
                tickets:{
                    "incorrectType": 1
                }
              }
            
            expect(ticketService.isTicketTypesValid(obj)).toEqual(false);
        })  
    })


});