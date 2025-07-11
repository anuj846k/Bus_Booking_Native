import apiClient from '../apiClient';

export const fetchBuses = async (from: string, to: string, date: string) => {
  const { data } = await apiClient.get('/bus/search', {
    params: { from, to, date },
  });
  return data?.data || [];
};

export const fetchBusDetails = async (busId: string) => {
  const { data } = await apiClient.get(`/bus/${busId}`);
  return data?.data;
};

export const fetchUserTickets = async () => {
  const { data } = await apiClient.get('/ticket/my-tickets');
  return data?.tickets || [];
};

export const bookTicket = async (
  busId: string,
  date: string,
  seatNumbers: number[],
) => {
  const { data } = await apiClient.post('/ticket/book', {
    busId,
    date,
    seatNumbers,
  });
  return data?.ticket;
};
