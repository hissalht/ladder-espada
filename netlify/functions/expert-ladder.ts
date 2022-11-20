import { Handler } from "@netlify/functions";
import { fetchTournament } from "../fetchLadder";

const TOURNAMENT_SLUG = process.env.EXPERT_TOURNAMENT_SLUG;

const handler: Handler = async (event, context) => {
  if (!TOURNAMENT_SLUG) {
    throw new Error("Unconfigured EXPERT_TOURNAMENT_SLUG");
  }

  const data = await fetchTournament(TOURNAMENT_SLUG);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
};

export { handler };
