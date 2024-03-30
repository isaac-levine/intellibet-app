"use client";

import { useState, useEffect } from "react";

export default function NBAGamesDropdown() {
  const [games, setGames] = useState<
    { homeTeam: string; awayTeam: string; time: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

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
  );
}
