import { Character, LadderTournament, Participant } from "../src/types";
import fetch from "node-fetch";

export async function fetchTournament(slug: string): Promise<LadderTournament> {
  if (!process.env.CHALLONGE_API_KEY) {
    console.error("Unconfigured api key");
    throw new Error("Unconfigured api key");
  }

  const url = new URL(`https://api.challonge.com/v1/tournaments/${slug}.json`);
  url.searchParams.set("include_matches", "1");
  url.searchParams.set("include_participants", "1");
  url.searchParams.set("api_key", process.env.CHALLONGE_API_KEY);

  const response = await fetch(url.toString());

  if (response.status >= 400) {
    console.error("Failed to fetch challonge API");
    throw new Error("Failed to fetch challonge API");
  }

  const data = (await response.json()) as any;

  const participants: Participant[] = data.tournament.participants.map(
    ({ participant }: any) => ({
      id: participant.id,
      name: participant.name,
      character: Character.SOL,
      wonMatches: 0,
      lostMatches: 0,
      points: 0,
    })
  );

  // parse participants
  data.tournament.matches.forEach(({ match }: any) => {
    const winnerPlayer = participants.find((p) => p.id === match.winner_id);
    if (winnerPlayer) {
      winnerPlayer.wonMatches++;
    }

    const loserPlayer = participants.find((p) => p.id === match.loser_id);
    if (loserPlayer) {
      loserPlayer.lostMatches++;
    }
  });

  // sort participants, most wins first
  participants.sort((a, b) => {
    if (a.wonMatches !== b.wonMatches) {
      return b.wonMatches - a.wonMatches;
    }
    if (a.lostMatches !== b.lostMatches) {
      return a.lostMatches - b.lostMatches;
    }
    if (a.points !== b.points) {
      return a.points - b.points;
    }
    return 0;
  });

  return {
    participants,
  };
}
