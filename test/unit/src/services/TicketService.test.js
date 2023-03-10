import { jest } from '@jest/globals';
import InvalidPurchaseException from '../../../../src/services/lib/InvalidPurchaseException.js';
import TicketService from '../../../../src/services/TicketService.js';
import TicketTypeRequest from '../../../../src/services/lib/TicketTypeRequest.js';
import TicketPaymentService from '../../../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../../../src/thirdparty/seatbooking/SeatReservationService.js';

jest.mock('../../../../src/thirdparty/paymentgateway/TicketPaymentService.js')
jest.mock('../../../../src/thirdparty/seatbooking/SeatReservationService.js')


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
        //3rd party errors
        test('should handle errors from makePayment',()=>{
            const ticketService = new TicketService();

            const makePaymentSpy = jest.spyOn(TicketPaymentService.prototype,'makePayment').mockImplementationOnce(()=>{
                throw new Error('payment failed')
            });
            const arr = [new TicketTypeRequest('ADULT', 2),new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            const expectedObj={
                totalPrice: 60,
                totalSeatsReserved: 4
            }
            try{
                ticketService.purchaseTickets(1,arr)
            }catch(err){
                expect(err.status).toEqual(500)
                expect(err.message).toEqual("Internal error, payment failed")
            }
            expect(makePaymentSpy).toHaveBeenCalledTimes(1)
        })

        test('should handle errors from reserveSeat',()=>{
            const ticketService = new TicketService()
            const reserveSeatSpy = jest.spyOn(SeatReservationService.prototype,'reserveSeat').mockImplementationOnce(()=>{
                throw new Error ("ticket service failed!")
            })
            const arr = [new TicketTypeRequest('ADULT', 2),new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            try{
                ticketService.purchaseTickets(1,arr)
            }catch(err){
                expect(err.status).toEqual(500)
                expect(err.message).toEqual("Internal error, seat reservation failed")
            }
            expect(reserveSeatSpy).toHaveBeenCalledTimes(1)
        })
         
        test('on success return an object with total price and seats reserved back',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2),new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            const expectedObj={
                totalPrice: 60,
                totalSeatsReserved: 4,
                ticketTypesPurchased: {
                    ADULT:2,
                    CHILD:2,
                    INFANT:2
                }
            }
            expect(ticketService.purchaseTickets(1,arr)).toMatchObject(expectedObj)
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
        test('return total seats for ADULT and CHILD,should be excluding INFANT',()=>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.calculateSeatsReserved(arr)).toEqual(4)
        })

        test('return total seats for ADULT,should be excluding INFANT',()=>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.calculateSeatsReserved(arr)).toEqual(2)
        })
    })

    describe("calculateTicketPrice",()=>{
        test('return total ticket price for ADULT and CHILD,should be excluding INFANT',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            expect(ticketService.calculateTicketPrice(arr)).toEqual(60)
        })

        test('return total ticket price for ADULT',() =>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 2)]
            expect(ticketService.calculateTicketPrice(arr)).toEqual(40)
        })
    })

    describe("createTicketTypeRequest",() =>{
        test('return new ticket type request array from payload object',() =>{
            const ticketService = new TicketService();
            const obj = 
            {
                ADULT: 2,
                CHILD: 2,
                INFANT: 2
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
                ADULT: 2
            }
            
            expect(ticketService.createTicketTypeRequest(obj)[0].getTicketType()).toEqual('ADULT')
            expect(ticketService.createTicketTypeRequest(obj)[0].getNoOfTickets()).toEqual(2)
        })
    })

    describe("ticketTypesPurchased",()=>{
        test('return the ticket types that were attempted to be purchased',()=>{
            const ticketService = new TicketService();
            const arr = [new TicketTypeRequest('ADULT', 1),new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 1)]
            const expected ={
                ADULT:1,
                CHILD:2,
                INFANT:1
            }

            expect(ticketService.ticketTypesPurchased(arr)).toMatchObject(expected)
        })
    })
});
