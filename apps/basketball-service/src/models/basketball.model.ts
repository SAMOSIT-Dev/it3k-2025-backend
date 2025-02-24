import { RowDataPacket } from "mysql2";

export enum MatchStatus {
  ONGOING = 'ongoing',
  BREAK = 'break',
  FINISHED = 'finished',
}

export interface BasketballMatchRow extends RowDataPacket {
  id: number;
  team_A_id: number;
  team_B_id: number;
  status: MatchStatus;
  timeStart: string;
  timeEnd: string;
  score_A_Q1: number;
  score_A_Q2: number;
  score_B_Q1: number;
  score_B_Q2: number;
  score_A_OT: number;
  score_B_OT: number;
  team_A_uniName: string;
  team_A_image: string;
  team_A_color: string;
  team_B_uniName: string;
  team_B_image: string;
  team_B_color: string;
};

export interface Match {
  id: number;
  team_A: {
    id: number;
    uniName: string;
    image: string;
    color_code: string;
  };
  team_B: {
    id: number;
    uniName: string;
    image: string;
    color_code: string;
  };
  status: MatchStatus;
  time: string;
  score_A_Q1: number;
  score_A_Q2: number;
  score_B_Q1: number;
  score_B_Q2: number;
  score_A_OT: number;
  score_B_OT: number;
};

export interface Schedule {
  id: number;
  team_A_id: number;
  team_B_id: number;
  status: MatchStatus;
  timeStart: string;
  timeEnd: string;
}