import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  // Example data, replace this with actual data fetching logic
  const games = [
    { homeTeam: "Lakers", awayTeam: "Warriors", time: "7:00 PM" },
    { homeTeam: "Nets", awayTeam: "Bucks", time: "9:30 PM" },
  ];

  res.status(200).json(games);
};

export default handler;
