import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event, context) => {
  if (!process.env.CHALLONGE_API_KEY) {
    console.error("Unconfigured api key");
    return {
      statusCode: 500,
      body: "Unconfigured api key",
    };
  }

  const tournamentSlug = event.queryStringParameters?.tournament;
  if (!tournamentSlug) {
    console.error("Missing tournament parameter");
    return {
      statusCode: 400,
      body: "Missing tournament parameter",
    };
  }

  // your server-side functionality
  const url = new URL(
    `https://api.challonge.com/v1/tournaments/${tournamentSlug}.json`
  );
  url.searchParams.set("include_matches", "1");
  url.searchParams.set("include_participants", "1");
  url.searchParams.set("api_key", process.env.CHALLONGE_API_KEY);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (response.status >= 400) {
    console.error("Failed to fetch challonge API");
    return {
      statusCode: 500,
      body: "Failed to fetch challonge API",
    };
  }

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export { handler };
