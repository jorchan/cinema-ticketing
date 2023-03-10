import {jest} from '@jest/globals'
import { purchaseTickets } from "../../../src/controllers/TicketController.js";

describe("purchaseTickets",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    })
    test('return status 400 if no account id given to controller',()=>{
       
        const mReq ={
            body: {
                accountInfo:{
                    id: null,
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
        mRes.status = jest.fn().mockReturnValue(mRes)
        
        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.send).toHaveBeenCalledWith("no account id included")
    })
    test('return status 400 if no keys are found in the ticket object was given to controller',()=>{
       
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
        mRes.status = jest.fn().mockReturnValue(mRes)
        
        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.send).toHaveBeenCalledWith("no tickets being purchased")
    })

    test('return status 400 if no ticket object was given to controller',()=>{
       
        const mReq ={
            body: {
                accountInfo:{
                    id: 1,
                }
            }
        }
        const mRes ={}
        mRes.send = jest.fn().mockReturnValue(mRes),
        mRes.status = jest.fn().mockReturnValue(mRes)
        
        purchaseTickets(mReq,mRes);
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.send).toHaveBeenCalledWith("no tickets being purchased")
    })
})