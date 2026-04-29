import axios from "axios";
import { Booking, Flight } from "../types";

const api = axios.create({
    baseURL: "http://localhost:8080/api/flights",
});

export const getAllFlights = () => {
    api.get<Flight[]>("/").then((response) => response.data);
};

export const getAvailableFlights = () => {
    api.get<Flight[]>("/available").then((response) => response.data);
}

export const bookFlight = (booking: Booking) => {
    api.post("/book", booking).then((response) => response.data);
}

export const getBookingByEmail = (email: string) => {
    api.get<Booking[]>(`/bookings?email=${email}`).then((response) => response.data);
}

export const cancelBooking = (bookingId: number, email:string) => {
    api.delete(`/cancel/${bookingId}?email=${email}`).then((response) => response.data);
}
