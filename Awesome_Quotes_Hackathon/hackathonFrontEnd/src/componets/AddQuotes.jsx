import React, { useState } from "react";

export default function AddQuote() {
    const [author, setAuthor] = useState("");
    const [quote, setQuote] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (author && quote) {
            console.log("New Quote Added:", { author, quote });
            setAuthor("");
            setQuote("");
        } else {
            alert("Please fill out both fields");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-96 border border-gray-300"
            >
                <h2 className="text-xl font-semibold text-center mb-4">Add Quote</h2>

                <input
                    type="text"
                    placeholder="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border border-black rounded p-2 mb-3 outline-none"
                />

                <textarea
                    placeholder="Quote here"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full border border-black rounded p-2 mb-3 h-24 resize-none outline-none"
                ></textarea>

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
