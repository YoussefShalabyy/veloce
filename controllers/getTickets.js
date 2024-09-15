import endpoints from "../constants/endpoints";

const getTickets = async (setTickets, setLoading) => {
  const response = await fetch(endpoints.tickets, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export default getTickets;
