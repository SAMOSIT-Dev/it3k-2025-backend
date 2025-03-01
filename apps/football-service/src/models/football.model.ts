import { RowDataPacket } from "mysql2";

export enum MatchStatus {
  UPCOMMING = 'upcoming',
  ONGOING = 'ongoing',
  BREAK = 'break',
  FINISHED = 'finished',
}

export interface ScoreBoard {
  id: number;
  team: {
    uniName: string;
    image: string;
    color_code: string;
  };
  win_lose: string;
  point: string;
  point_diff: number;
};

export interface Match {
  id: number;
  team_A: {
    uniName: string;
    image: string;
    color_code: string;
    score: number;
  };
  team_B: {
    uniName: string;
    image: string;
    color_code: string;
    score: number;
  };
  status: MatchStatus;
  timeStart: string;
  timeEnd: string;
};
