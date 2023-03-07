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

    describe("isTicketAmountValid", () =>{
        test('return false if ticket amount is greater than 20', ()=>{
            const ticketService = new TicketService();
            const obj = {
                tickets:{
                  adult: 15,
                  child: 5,
                  infant: 1
                }
            }
            expect(ticketService.isTicketAmountValid(obj)).toEqual(false);
        })
        test('return true if ticket amount is less than or equal to 20', ()=>{
            const ticketService = new TicketService();
            const obj = {
                tickets:{
                  adult: 2,
                  child: 5,
                  infant: 1
                }
            }
            expect(ticketService.isTicketAmountValid(obj)).toEqual(true);
        })
    })


});