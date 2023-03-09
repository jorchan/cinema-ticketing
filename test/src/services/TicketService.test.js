import InvalidPurchaseException from "../../../src/services/lib/InvalidPurchaseException";
import TicketService from "../../../src/services/TicketService";
import TicketTypeRequest from "../../../src/services/lib/TicketTypeRequest";

describe("TicketService", ()=>{
    describe("purchaseTickets", ()=>{
        test('return an error if passed an invalid account id',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 2)]
            try{
                ticketService.purchaseTickets(0,arr)
            }catch(err){
                expect(err).toBeInstanceOf(InvalidPurchaseException)
                expect(err.message).toEqual("Account Id is invalid")
            }  
        })  
        test('return an error if no ADULT ticket has been purchased',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 0),new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 2)]
            try{
                ticketService.purchaseTickets(1,arr)
            }catch(err){
                expect(err).toBeInstanceOf(InvalidPurchaseException)
                expect(err.message).toEqual("No Adult ticket purchased")
            }  
        })  
        test('return an error if no ADULT ticket has been passed in the payload',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 2)]
            try{
                ticketService.purchaseTickets(1,arr)
            }catch(err){
                expect(err).toBeInstanceOf(InvalidPurchaseException)
                expect(err.message).toEqual("No Adult ticket purchased")
            }  
        })  
        test('return an error if over 20 tickets purchased',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 15),new TicketTypeRequest('CHILD', 5), new TicketTypeRequest('INFANT', 2)]
            try{
                ticketService.purchaseTickets(1,arr)
            }catch(err){
                expect(err).toBeInstanceOf(InvalidPurchaseException)
                expect(err.message).toEqual("Ticket amount invalid")
            }  
        })  
        test('return an error if no tickets purchased',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 0),new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 0)]
            try{
                ticketService.purchaseTickets(1,arr)
            }catch(err){
                expect(err).toBeInstanceOf(InvalidPurchaseException)
                expect(err.message).toEqual("Ticket amount invalid")
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
            const arr = [new TicketTypeRequest('ADULT', 20), new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isTicketAmountValid(arr)).toEqual(false);
        })
        test('return true if ticket amount is less than or equal to 20', ()=>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isTicketAmountValid(arr)).toEqual(true);
        })
        test('return false if ticket amount is 0',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 0), new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 0)]
            expect(ticketService.isTicketAmountValid(arr)).toEqual(false)
        })
    })

    describe("is ADULT TicketPurchased", () =>{
        test('if ADULT ticket has been purchased, return true',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 0), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isAdultTicketPurchased(arr)).toEqual(true);
        });

        test('if ADULT ticket has not been purchased, return false',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', -9), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isAdultTicketPurchased(arr)).toEqual(false);
        });

        test('if ADULT ticket is not in payload, return false',() =>{
            const ticketService = new TicketService();
            const arr = [ new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.isAdultTicketPurchased(arr)).toEqual(false);
        });
    });

    describe("calculateSeatReserved",() =>{
        test('return total seats for ADULT and CHILD, excluding INFANT',()=>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.calculateSeatReserved(arr)).toEqual(4)
        })

        test('return total seats for ADULT, excluding INFANT',()=>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.calculateSeatReserved(arr)).toEqual(2)
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
            
            expect(ticketService.createTicketTypeRequest(obj)[0].getTicketType()).toEqual('ADULT')
            expect(ticketService.createTicketTypeRequest(obj)[0].getNoOfTickets()).toEqual(2)

            expect(ticketService.createTicketTypeRequest(obj)[1].getTicketType()).toEqual('CHILD')
            expect(ticketService.createTicketTypeRequest(obj)[1].getNoOfTickets()).toEqual(2)
            
            expect(ticketService.createTicketTypeRequest(obj)[2].getTicketType()).toEqual('INFANT')
            expect(ticketService.createTicketTypeRequest(obj)[2].getNoOfTickets()).toEqual(2)
        })

        test('return new ticket type request array from payload object of just ADULT',() =>{
            const ticketService = new TicketService();
            const obj = 
            {
            accountInfo:{
                id: 1,
            },
            tickets:{
                ADULT: 2
            }
            }
            
            expect(ticketService.createTicketTypeRequest(obj)[0].getTicketType()).toEqual('ADULT')
            expect(ticketService.createTicketTypeRequest(obj)[0].getNoOfTickets()).toEqual(2)
        })
    })
});