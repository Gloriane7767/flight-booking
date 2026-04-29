import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { getAllFlights } from "../api/flightApi";
import { Flight } from "../types";
import BookingForm from "../components/BookingForm";

export default function AllFlights() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        getAllFlights().then(setFlights);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Plane /> All Flights
            </h1>
            <div className="grid gap-4">
                {flights.map((f) => (
                    <div key={f.id} className="border rounded-lg p-4 shadow-sm bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{f.flightNumber} → {f.destination}</p>
                                <p className="text-sm text-gray-500">Departure: {new Date(f.departureTime).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Arrival: {new Date(f.arrivalTime).toLocaleString()}</p>
                                <p className="text-sm font-medium mt-1">💰 ${f.price}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${f.status === "AVAILABLE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {f.status}
                </span>
                                {f.status === "AVAILABLE" && (
                                    <button
                                        onClick={() => setSelected(selected === f.id ? null : f.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                        </div>
                        {selected === f.id && (
                            <BookingForm flightId={f.id} onClose={() => setSelected(null)} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
