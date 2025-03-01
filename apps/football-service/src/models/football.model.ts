import { RowDataPacket } from "mysql2";

export enum MatchStatus {
  UPCOMMING = 'upcoming',
  ONGOING = 'ongoing',
  BREAK = 'break',
  FINISHED = 'finished',
}

export interface ScoreBoard {
  id: number;
  university: string;
  winLose: string;
  point: string;
  pointDiff: number;
};

export interface Match {
  id: number;
  team_A: {
    uniName: string;
    score: number;
  };
  team_B: {
    uniName: string;
    score: number;
  };
  status: MatchStatus;
  timeStart: string;
  timeEnd: string;
};
