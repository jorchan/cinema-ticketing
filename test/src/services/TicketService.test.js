import InvalidPurchaseException from "../../../src/services/lib/InvalidPurchaseException";
import TicketService from "../../../src/services/TicketService";
import TicketTypeRequest from "../../../src/services/lib/TicketTypeRequest";

describe("TicketService", ()=>{
    describe("purchaseTickets", ()=>{
        xtest('return an error if passed a unsupported ticket type',() =>{
            const ticketService = new TicketService();
            const obj = {
                tickets:{
                  ADULT: 1,
                  CHILD: 1,
                  INFANT: 1
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

    describe("isTicketAmountValid", () =>{
        test('return false if ticket amount is greater than 20', ()=>{
            const ticketService = new TicketService();
            const obj = {
            accountInfo:{
                id: 1,
            },
                tickets:{
                  ADULT: 15,
                  CHILD: 5,
                  INFANT: 1
                }
            }
            expect(ticketService.isTicketAmountValid(obj.tickets)).toEqual(false);
        })
        test('return true if ticket amount is less than or equal to 20', ()=>{
            const ticketService = new TicketService();
            const obj = {
            accountInfo:{
                id: 1,
            },
                tickets:{
                  ADULT: 2,
                  CHILD: null,
                  INFANT: 1
                }
            }
            expect(ticketService.isTicketAmountValid(obj.tickets)).toEqual(true);
        })
        test('return false if ticket amount is 0',() =>{
            const ticketService = new TicketService();
            const obj = {
            accountInfo:{
                id: 1,
            },
                tickets:{
                  ADULT: 0,
                  CHILD: 0,
                  INFANT: 0
                }
            }
            expect(ticketService.isTicketAmountValid(obj.tickets)).toEqual(false)
        })
    })

    describe("is ADULT TicketPurchased", () =>{
        test('if ADULT ticket has been purchased, return true',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isAdultTicketPurchased(arr)).toEqual(true);
        });

        test('if ADULT ticket has not been purchased, return false',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', -9), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isAdultTicketPurchased(arr)).toEqual(false);
        });
    });

    describe("calculateSeatReserved",() =>{
        test('return total seats for ADULT and CHILDren, excluding INFANTs',()=>{
            const ticketService = new TicketService();
            const obj = 
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
            expect(ticketService.calculateSeatReserved(obj.tickets)).toEqual(4)
        })
    })

    describe("createTicketTypeRequest",() =>{
        test('return new ticket type request array from payload object',() =>{
            const ticketService = new TicketService();
            const obj = 
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

            const expected = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            
            expect(ticketService.createTicketTypeRequest(obj)[0].getTicketType()).toEqual('ADULT')
            expect(ticketService.createTicketTypeRequest(obj)[0].getNoOfTickets()).toEqual(2)

            expect(ticketService.createTicketTypeRequest(obj)[1].getTicketType()).toEqual('CHILD')
            expect(ticketService.createTicketTypeRequest(obj)[1].getNoOfTickets()).toEqual(2)
            
            expect(ticketService.createTicketTypeRequest(obj)[2].getTicketType()).toEqual('INFANT')
            expect(ticketService.createTicketTypeRequest(obj)[2].getNoOfTickets()).toEqual(2)
        })
    })
});