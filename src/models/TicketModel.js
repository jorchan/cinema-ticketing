const ticketPricesDB={
    ADULT: 20,
    CHILD: 10,
    INFANT: 0
  }

export const getTicketPrices = (ticketType) =>
{
  return ticketPricesDB[ticketType] 
}
