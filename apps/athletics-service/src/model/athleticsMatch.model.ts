export interface AthleticsMatch {
    id?: number;
    event: '100m male' | '100m female' | '400m male' | '400m female';
    team_A_id: number;
    team_B_id: number;
    time: string;
    locationId: number;
    score_A?: number;
    score_B?: number;
}

export type University = {
    id: number;
    uniName: string;
    image: string;
    colorCode: string;
    ranking: number;
};

export type GroupedMatch = {
    event: string;
    time: string;
    location: string;
    teams: University[];
};
