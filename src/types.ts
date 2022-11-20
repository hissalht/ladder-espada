export enum Character {
  SOL = "SOL",
}

export interface Participant {
  id: string;
  name: string;
  character: Character;

  wonMatches: number;
  lostMatches: number;
  points: number;
}

export interface LadderTournament {
  participants: Participant[];
}

export enum LadderLeague {
  BEGINNER = "beginner",
  EXPERT = "expert",
}
