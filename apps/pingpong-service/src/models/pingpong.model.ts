export interface PingpongMatch {
  id: number;
  type: PingpongType;
  team_A_id: number;
  team_B_id: number;
  time: string;
  locationId: number;
  locationName: string;
  round?: number;
  score_A?: number;
  score_B?: number;
  team_A_detail: UniversityDetail;
  team_B_detail: UniversityDetail;
}

export interface UniversityDetail {
  id: number;
  uniName: string;
  image: string;
  color_code: string;
}

export enum PingpongType {
    MIX = 'mix',
    single_male = 'single male',
    SINGLE_FEMALE = 'single female',
    PAIR_MALE = 'pair male',
    PAIR_FEMALE = 'pair female',
}
