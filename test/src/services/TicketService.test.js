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

    describe("isAccountIdValid",() =>{
        test('if account id is less than 1 then return false',()=>{
            const ticketService = new TicketService();
            expect(ticketService.isAccountIdValid(0)).toEqual(false);
        })

        test('if account id is more than or equal to 1 then return true',()=>{
            const ticketService = new TicketService();
            expect(ticketService.isAccountIdValid(1)).toEqual(true);
        })
    })

    describe("isTicketTypesValid", ()=>{
        test('return a false if passed an empty ticket type',() =>{
            const ticketService = new TicketService();
            const obj = 
            {
            accountInfo:{
                id: 1
            },
            tickets:{
            }
            }
            
            expect(ticketService.isTicketTypesValid(obj.tickets)).toEqual(false);
        })  
        test('return false if passed a incorrect ticket type',() =>{
            const ticketService = new TicketService();
            const obj = 
            {
            accountInfo:{
                id: 1
            },
            tickets:{
                incorrectType: 1
            }
            }
            
            expect(ticketService.isTicketTypesValid(obj.tickets)).toEqual(false);
        })  
        test('return true if ticketTypes are valid',() =>{
            const ticketService = new TicketService();
            const obj =
            {
                accountInfo:{
                    id:1
                },
                tickets:{
                    adult: 1,
                    child: 0,
                    infant: null
                }
            }
            
            expect(ticketService.isTicketTypesValid(obj.tickets)).toEqual(true);
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
                  child: null,
                  infant: 1
                }
            }
            expect(ticketService.isTicketAmountValid(obj)).toEqual(true);
        })
    })

    describe("isAdultTicketPurchased", () =>{
        test('if Adult ticket has been purchased, return true',() =>{
            const ticketService = new TicketService();
            const obj = 
            {
            accountInfo:{
                id: 1,
            },
            tickets:{
                adult: 1,
                child: 1,
                infant: 1
            }
            }
            expect(ticketService.isAdultTicketPurchased(obj.tickets)).toEqual(true);
        });

        test('if Adult ticket has not been purchased, return false',() =>{
            const ticketService = new TicketService();
            const obj = 
            {
            accountInfo:{
                id: 1,
            },
            tickets:{
                child: 1,
                infant: 1
            }
            }
            expect(ticketService.isAdultTicketPurchased(obj.tickets)).toEqual(false);
        });
    });
});