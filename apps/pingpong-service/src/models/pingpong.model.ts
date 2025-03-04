export interface PingpongMatch{
  matchId: number;
  id: number;
  type: PingpongType;
  team_A_id: number;
  team_B_id: number;
  time: string;
  locationId: number;
  locationName: string;
  pingpong_sets: PingpongSet;
  team_A_details: UniversityDetail;
  team_B_details: UniversityDetail;
}

export interface UniversityDetail {
  id: number;
  uniName: string;
  image: string;
  color_code: string;
}

export enum PingpongType {
    mix = 'mix',
    single_male = 'single male',
    single_female = 'single female',
    pair_male = 'pair male',
    pair_female = 'pair female',
}

export interface PingpongSet {
  id: number;
  round?: number;
  score_A?: number;
  score_B?: number;
  pingpong_match_id: number;
}