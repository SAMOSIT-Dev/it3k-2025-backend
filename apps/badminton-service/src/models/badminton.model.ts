export interface BadmintonMatch{
    matchId: number;
    id: number;
    type: BadmintonType;
    team_A_id: number;
    team_B_id: number;
    time: string;
    locationId: number;
    locationName: string;
    badminton_sets: BadmintonSet[];
    team_A_details: UniversityDetail;
    team_B_details: UniversityDetail;
  }
  
  export interface UniversityDetail {
    id: number;
    uniName: string;
    image: string;
    color_code: string;
  }
  
  export enum BadmintonType {
      mix = 'mix',
      single_male = 'single male',
      single_female = 'single female',
      pair_male = 'pair male',
      pair_female = 'pair female',
  }
  
  export interface BadmintonSet {
    id: number;
    round?: number;
    score_A?: number;
    score_B?: number;
    badminton_match_id: number;
  }