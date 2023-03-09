import TicketTypeRequest from "../../../../src/services/lib/TicketTypeRequest"

describe("TicketTypeRequest",() =>{
    test('if noOftickets is not an int return an error',()=>{
        try{
            const ticketTypeRequest = new TicketTypeRequest('ADULT','a')
        }catch(err){
            expect(err.message).toEqual("noOfTickets must be an integer")
        }   
    })
    test('if noOftickets is not an int return an error',()=>{
        try{
            const ticketTypeRequest = new TicketTypeRequest('STUDENT',1)
        }catch(err){
            expect(err.message).toEqual("type must be ADULT, CHILD, or INFANT")
        }
    })
})