"use client";

import { useState, useEffect } from "react";

export default function NBAGamesDropdown() {
  const [games, setGames] = useState<
    { homeTeam: string; awayTeam: string; time: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    fetch(`/api/sentiment?team=${encodeURIComponent(team)}`)
      .then((response) => response.json())
      .then((data) => {
        setSentiment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <input
        type="text"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="border border-gray-400 p-2"
      />
      <button onClick={handleSubmit} className="border border-gray-400 p-2">
        Submit
      </button>
      <p>{JSON.stringify(sentiment)}</p>
      <select>
        {loading ? (
          <option>Loading...</option>
        ) : (
          games.map((game, index) => (
            <option key={index}>
              {game.homeTeam} vs {game.awayTeam} at {game.time}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
