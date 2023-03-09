import TicketTypeRequest from './lib/TicketTypeRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
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
    if (this.isAccountIdValid(accountId) === false){
      throw new InvalidPurchaseException("Account Id is invalid") 
    }
    if (this.isTicketAmountValid(ticketTypeRequests) === false){
      throw new InvalidPurchaseException("Ticket amount invalid")
    }
    if (this.isAdultTicketPurchased(ticketTypeRequests) === false){
      throw new InvalidPurchaseException("No Adult ticket purchased")
    }

    const totalPurchasePrice = this.calculateTicketPrice(ticketTypeRequests);
    const ticketPaymentService = new TicketPaymentService();
    
    const totalSeatsToReserve = this.calculateSeatsReserved(ticketTypeRequests);
    const seatReservationService = new SeatReservationService();

    try{
      ticketPaymentService.makePayment(accountId,totalPurchasePrice);
    }catch{
      const error = new Error ('Internal error, payment failed')
      error.status = 500
      throw error
    }

    try{
      seatReservationService.reserveSeat(accountId,totalSeatsToReserve);
    }catch{
      const error = new Error ('Internal error, seat reservation failed')
      error.status = 500
      throw error
    }
    
    return {
      totalPrice: totalPurchasePrice,
      totalSeatsReserved: totalSeatsToReserve
    }
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
    const calculatedTicketPrice = ticketTypeRequests.reduce((acc,curr) => acc + (curr.getNoOfTickets() * getTicketPrices(curr.getTicketType())), 0);
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
