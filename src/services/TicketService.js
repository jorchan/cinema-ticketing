import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { getTicketPrices } from '../models/TicketModel.js';

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


  purchaseTickets(accountId, ticketTypeRequests) {

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
      throw new InvalidPurchaseException("Account Id is invalid") 
    }
    if (this.isTicketAmountValid(ticketTypeRequests) === false){
      throw new InvalidPurchaseException("Ticket amount invalid")
    }
    if (this.isAdultTicketPurchased(ticketTypeRequests) === false){
      throw new InvalidPurchaseException("No Adult ticket purchased")
    }

    const totalSeatsResevered = this.calculateSeatsReserved(ticketTypeRequests)
    
  }

  createTicketTypeRequest(purchaseRequestObj){
    const ticketsPurchased = Object.entries(purchaseRequestObj.tickets);
    const ticketTypeRequestArr = ticketsPurchased.map(([type,noOfTickets]) => new TicketTypeRequest(type,noOfTickets))
    
   return ticketTypeRequestArr
  }

  isAccountIdValid(id){
    return !(id < 1)
  }

  calculateSeatsReserved(ticketTypeRequests){
    const calculatedSeats = ticketTypeRequests.reduce((acc,curr) => {
      if(curr.getTicketType() ==='INFANT'){
        return acc
      }else{
        return acc + curr.getNoOfTickets()
      }}, 0);
      
    return calculatedSeats
  }

  calculateTicketPrice(ticketTypeRequests){
    const ticketPrices={
      adult: 20,
      child: 10,
      infant: 0
    }
    const calculatedTicketPrice = ticketTypeRequests.reduce((acc,curr) => {
      switch(curr.getTicketType()){
        case 'CHILD':
          return acc+(ticketPrices.child*curr.getNoOfTickets())
          break;
        case 'ADULT':
          return acc+(ticketPrices.adult*curr.getNoOfTickets())
          break;
        default:
          return acc
      }}, 0);
      return calculatedTicketPrice
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
