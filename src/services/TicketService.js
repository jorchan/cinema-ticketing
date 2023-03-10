import TicketTypeRequest from './lib/TicketTypeRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { getTicketPrices } from '../models/TicketModel.js';

export default class TicketService {
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

    const ticketTypesPurchased = this.ticketTypesPurchased(ticketTypeRequests);
   
    return {
      totalPrice: totalPurchasePrice,
      totalSeatsReserved: totalSeatsToReserve,
      ticketTypesPurchased: ticketTypesPurchased
    }
  }

  createTicketTypeRequest(purchaseRequestTicketTypeObj){
    const ticketsPurchased = Object.entries(purchaseRequestTicketTypeObj);
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

  ticketTypesPurchased(ticketTypeRequests){
    const ticketTypes = ticketTypeRequests.reduce((acc,curr)=>{ 
      return{
        ...acc,
        [curr.getTicketType()]: curr.getNoOfTickets(),
      };
    },{});
    return ticketTypes
  }

}
