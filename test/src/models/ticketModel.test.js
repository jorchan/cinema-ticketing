import { getTicketPrices } from "../../../src/models/TicketModel.js"

describe("getTicketPrices",()=>{
    test('return correct value for Adult ticket price',()=>{
        expect(getTicketPrices('ADULT')).toEqual(20);
    })
})
    