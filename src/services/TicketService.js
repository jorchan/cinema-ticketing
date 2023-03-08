import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  
  // CONTROLLER 
  /*
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
    
    ---> [new TicketTypeRequest]
  */

    //SERVICE 
  /* [new TicketTypeRequest]

    validate number of seats, number of tickets, ticket prices, return response
    HTTP 200
    {
      success: true,
      ticketsPurchased: 8
      totalPrice: 3io
    }
  */


  purchaseTickets(accountId, ...ticketTypeRequests) {

// |   Ticket Type    |     Price   |
// | ---------------- | ----------- |
// |    INFANT        |    £0       |
// |    CHILD         |    £10      |
// |    ADULT         |    £20      |
    const ticketPrices={
      adult: 20,
      child: 10,
      infant: 0
    }

    
    
    if (this.isAccountIdValid(accountId) === false){
      return "Account Id is invalid"
    }
    if (this.isTicketTypesValid(purchaseRequest.tickets) === false){
      return "No valid ticket type found"
    }
    if (this.isAdultTicketPurchased(purchaseRequest.tickets) === false){
      return "No Adult ticket purchased"
    }
    if (this.isTicketAmountValid(purchaseRequest.tickets) === false){
      return "Ticket amount invalid"
    }
  }

  createTicketTypeRequest(purchaseRequest){
    const ticketsPurchased = Object.entries(purchaseRequest.tickets);
    const ticketTypeRequestArr = ticketsPurchased.map(([type,noOfTickets]) => new TicketTypeRequest(type,noOfTickets))
    
   return ticketTypeRequestArr
  }

  isAccountIdValid(id){
    return !(id < 1)
  }

  calculateSeatReserved(ticketTypeObj){
    return ticketTypeObj?.ADULT + ticketTypeObj?.CHILD
  }

  isAdultTicketPurchased(ticketTypeRequests){
    const isAdultAvail = ticketTypeRequests.some(item => item.getTicketType() === 'ADULT' && item.getNoOfTickets() > 0)
    return isAdultAvail
  }

  isTicketAmountValid(ticketTypeRequests){
    const sumOfTickets = ticketTypeRequests.reduce((acc,curr) => acc + curr.getNoOfTickets(), 0)
    return !(sumOfTickets > 20 || sumOfTickets === 0)
  }
}
