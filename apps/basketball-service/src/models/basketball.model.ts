export enum MatchStatus {
  ONGOING = 'ongoing',
  BREAK = 'break',
  FINISHED = 'finished',
}

export interface Match {
  id: number;
  team_A_id: number;
  team_B_id: number;
  status: MatchStatus;
  timeStart: string;
  timeEnd: string;
  locationId: number;
  score_A_Q1: number;
  score_A_Q2: number;
  score_B_Q1: number;
  score_B_Q2: number;
  score_A_OT: number;
  score_B_OT: number;
}

export interface Schedule {
  id: number;
  team_A_id: number;
  team_B_id: number;
  status: MatchStatus;
  timeStart: string;
  timeEnd: string;
}