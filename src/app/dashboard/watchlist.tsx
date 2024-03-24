"use client";

import { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState([
    "BOS vs. LAL",
    "NY vs. GS",
    "MIA vs. CHI",
    "PHI vs. ATL",
    "LAC vs. DAL",
    "POR vs. UTA",
  ]);
  const [newGame, setNewGame] = useState("");

  const addGame = (event: React.FormEvent) => {
    if (newGame.trim() === "") {
      return; // Don't add empty strings
    }
    event.preventDefault();
    setWatchlistItems([...watchlistItems, newGame]);
    setNewGame("");
  };

  const removeGame = (index: number) => {
    setWatchlistItems(watchlistItems.filter((_, i) => i !== index));
  };

  return (
    <div className="w-1/5 rounded-md border-gray-400 border shadow-sm mr-1 h-screen">
      <h1 className="text-center font-semibold">Watchlist</h1>
      <form
        className="px-4 rounded shadow-md flex items-center"
        onSubmit={addGame}
      >
        <input
          type="text"
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
          placeholder="Add new game"
          className=""
        />
        <button type="submit">
          <PlusCircleIcon className="h-5 w-5 text-darkgreen" />
        </button>
      </form>
      <ul className="py-4">
        {watchlistItems.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 rounded border flex justify-between items-center"
          >
            {item}
            <button onClick={() => removeGame(index)}>
              <MinusCircleIcon className="h-5 w-5 text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
