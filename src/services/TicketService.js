import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  
  purchaseTickets(accountId, ticketTypeRequestObj) {
    const obj = 
    {
      tickets:{
        adult: 1,
        child: 1,
        infant: 1
      }
    }
   
  }

  isTicketTypesValid(ticketTypeRequestObj){
    const requiredKeys = ['adult', 'child', 'infant'];
    const ticketTypes = Object.keys(ticketTypeRequestObj.tickets)
    const isKeysValid = ticketTypes.length > 0 && ticketTypes.every(key => requiredKeys.includes(key));

    return isKeysValid
  }
}
