import { getTicketPrices } from "../../../src/models/TicketModel.js"

describe("getTicketPrices",()=>{
    test('return correct value for Adult ticket price',()=>{
        expect(getTicketPrices('ADULT')).toEqual(20);
    })
    test('return correct value for CHILD ticket price',()=>{
        expect(getTicketPrices('CHILD')).toEqual(10);
    })
    test('return correct value for INFANT ticket price',()=>{
        expect(getTicketPrices('INFANT')).toEqual(0);
    })
})
    