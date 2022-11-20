export enum Character {
  TESTAMENT = "TESTAMENT",
  JACKO = "JACKO",
  NAGORIYUKI = "NAGORIYUKI",
  MILIA = "MILIA",
  CHIPP = "CHIPP",
  SOL = "SOL",
  KY = "KY",
  MAY = "MAY",
  ZATO = "ZATO",
  INO = "INO",
  HAPPYCHAOS = "HAPPYCHAOS",
  BAIKEN = "BAIKEN",
  ANJI = "ANJI",
  LEO = "LEO",
  FAUST = "FAUST",
  AXL = "AXL",
  POTEMKIN = "POTEMKIN",
  RAMLETHAL = "RAMLETHAL",
  GIOVANNA = "GIOVANNA",
  GOLDLEWIS = "GOLDLEWIS",
  BRIDGET = "BRIDGET",
}

export interface Participant {
  id: string;
  name: string;
  character: Character | null;

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
