import {jest} from '@jest/globals'
import { purchaseTickets } from '../../../../src/controllers/TicketController.js';
import TicketService from '../../../../src/services/TicketService.js';

jest.mock('../../../../src/services/TicketService.js')

describe("purchaseTickets",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    })
    test('return status 400 if no account id given to controller',()=>{
        const expectedObj={
            success:false,
            status: 400,
            message: "no account id included"
        }
        const mReq ={
            body: {
                accountInfo:{
                    id: null,
                },
                tickets:{
                    ADULT: 1,
                    CHILD: 1,
                    INFANT: 3
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes),
        mRes.json = jest.fn().mockReturnValue(mRes)
        
        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.json).toHaveBeenCalledWith(expectedObj)
        
    })
    test('return status 400 if no keys are found in the ticket object was given to controller',()=>{
        const expectedObj={
            success:false,
            status: 400,
            message: "no tickets being purchased"
        }
        const mReq ={
            body: {
                accountInfo:{
                    id: 1,
                },
                tickets:{
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes),
        mRes.json = jest.fn().mockReturnValue(mRes)
        
        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.json).toHaveBeenCalledWith(expectedObj)
    })

    test('return status 400 if no ticket object was given to controller',()=>{
        const expectedObj={
            success:false,
            status: 400,
            message: "no tickets being purchased"
        }
        const mReq ={
            body: {
                accountInfo:{
                    id: 1,
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes),
        mRes.json = jest.fn().mockReturnValue(mRes)
        
        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.json).toHaveBeenCalledWith(expectedObj)
    })

    test('return success object when a successful call to purchaseTickets has been made',()=>{
        const createTicketTypeRequestSpy = jest.spyOn(TicketService.prototype,'createTicketTypeRequest').mockImplementationOnce(()=>{
            //return [new TicketTypeRequest('ADULT', 2),new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 2)]
            return ['ADULT', 2,'CHILD', 2,'INFANT', 2]
        })
        const purchaseTicketsSpy = jest.spyOn(TicketService.prototype,'purchaseTickets').mockImplementationOnce(()=>{
            return {
                totalPrice: 60,
                totalSeatsReserved: 4,
                ticketTypesPurchased: {
                    ADULT:2,
                    CHILD:2,
                    INFANT:2
                }
              }
        })

        const mReq ={
            body: {
                accountInfo:{
                    id: 1,
                },
                tickets:{
                    ADULT: 2,
                    CHILD: 2,
                    INFANT: 2
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes),
        mRes.json = jest.fn().mockReturnValue(mRes)

        purchaseTickets(mReq,mRes);
        expect(mRes.json).toHaveBeenCalledWith({
            success: true,
            totalPrice: 60,
            totalSeatsReserved: 4,
            ticketsPurchased:{
                ADULT:2,
                CHILD:2,
                INFANT:2
            }
        })
        
    })

    test('return 500 error when there is an internal error',()=>{
        const purchaseTicketsSpy = jest.spyOn(TicketService.prototype,'purchaseTickets').mockImplementationOnce(()=>{
            throw new Error("error")
        })
        const expectedObj={
            success:false,
            status: 500,
            message: "error"
        }
        const mReq ={
            body: {
                accountInfo:{
                    id: 1,
                },
                tickets:{
                    ADULT: 1,
                    CHILD: 1,
                    INFANT: 3
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes),
        mRes.json = jest.fn().mockReturnValue(mRes)

        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(500)  
        expect(mRes.json).toHaveBeenCalledWith(expectedObj)
    })

    test('return default error message when there is an internal error without a error message',()=>{
        const purchaseTicketsSpy = jest.spyOn(TicketService.prototype,'purchaseTickets').mockImplementationOnce(()=>{
            throw new Error()
        })
        const expectedObj={
            success:false,
            status: 500,
            message: "unkown error occured"
        }
        const mReq ={
            body: {
                accountInfo:{
                    id: 1,
                },
                tickets:{
                    ADULT: 1,
                    CHILD: 1,
                    INFANT: 3
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes),
        mRes.json = jest.fn().mockReturnValue(mRes)

        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(500)  
        expect(mRes.json).toHaveBeenCalledWith(expectedObj)
    })
   
})