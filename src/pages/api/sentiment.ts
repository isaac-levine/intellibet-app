import { NextApiRequest, NextApiResponse } from "next";
import { mediaSentiment } from "@matteocacciola/sentiment";
import { SentimentConfiguration } from "@matteocacciola/sentiment/dist/types";
import axios from "axios";

var Sentiment = require("sentiment");
var sentiment = new Sentiment();

type SentimentAnalysisResult = {
  positive: number;
  negative: number;
  neutral: number;
  analyzedElements: Score[];
  summary?: string | null;
  timeRange: {
    from: string;
    to: string;
  };
  sentimentScore: number;
  analyzedAt: string;
};

type Score = {
  text: string;
  score?: number;
  category?: SentimentType;
};

type SentimentType = "positive" | "negative" | "neutral" | "undefined";

const configuration: SentimentConfiguration = {
  openai: { apiKey: process.env.OPENAI_API_KEY || "" },
  news: { apiKey: process.env.NEWS_API_KEY || "" },
};

const media = ["news"];

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const team = Array.isArray(req.query.team)
//     ? req.query.team[0]
//     : req.query.team;

//   if (!team) {
//     res.status(400).json({ error: "Missing team parameter" });
//     return;
//   }

//   console.log("team: ", team);
//   console.log("media: ", media);
//   console.log("configuration: ", configuration);

//   try {
//     const results: Record<string, SentimentAnalysisResult | null>[] =
//       await mediaSentiment(team, media, configuration);
//     res.status(200).json(results);
//   } catch (error) {
//     console.log("Error with mediaSentiment function: ", error);
//     res.status(500).json({ error: "Error with mediaSentiment function" });
//     return;
//   }
// };

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
const day = String(date.getDate()).padStart(2, "0");

const currentDate = `${year}-${month}-${day}`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const team = Array.isArray(req.query.team)
    ? req.query.team[0]
    : req.query.team;

  if (!team) {
    res.status(400).json({ error: "Missing team parameter" });
    return;
  }
  //   console.log("team: ", team);
  console.log("Getting news sentiment for team: ", team);

  let newsResponse;
  try {
    newsResponse = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        sources: "espn",
        q: team,
        from: "2024-03-29",
        sortBy: "popularity",
        apiKey: process.env.NEWS_API_KEY || "",
      },
    });
    // console.log("News API Response: ", newsResponse.data);
  } catch (error) {
    console.error("Error fetching data from the News API: ", error);
    res.status(500).json({
      error: "An error occurred while fetching data from the News API",
    });
    return;
  }

  const headlines = newsResponse.data.articles.map(
    (article: { title: any }) => article.title
  );

  const descriptions = newsResponse.data.articles.map(
    (article: { description: any }) => article.description
  );

  const contents = newsResponse.data.articles.map(
    (article: { content: any }) => article.content
  );

  const sentiments = contents.map(
    (content: any) => sentiment.analyze(content).score
  );

  const averageSentiment =
    sentiments.reduce((a: any, b: any) => a + b, 0) / sentiments.length;

  //   console.log("Headlines: ", headlines);
  contents.forEach((content: any) => {
    console.log("Article content: ", content);
    console.log("Sentiment: ", sentiment.analyze(content).score);
  });
  console.log("Contents: ", contents);
  console.log("Contents size: ", contents.length);
  console.log("Sentiments: ", sentiments);
  console.log("Average Sentiment: ", averageSentiment);

  res.json(newsResponse.data);
};

export default handler;
