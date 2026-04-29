import { useState } from "react";
import { bookFlight } from "../api/flightApi";

type Props = { flightId: number; onClose: () => void };

export default function BookingForm({ flightId, onClose }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await bookFlight(flightId, name, email);
            setMessage("✅ Booking confirmed!");
        } catch {
            setMessage("❌ Booking failed. Flight may already be booked.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            {message ? (
                <div className="text-center">
                    <p className="font-medium">{message}</p>
                    <button onClick={onClose} className="mt-2 text-sm text-blue-600 underline">
                        Close
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        className="border rounded px-3 py-2 text-sm"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="border rounded px-3 py-2 text-sm"
                        placeholder="Your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Booking..." : "Confirm Booking"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
