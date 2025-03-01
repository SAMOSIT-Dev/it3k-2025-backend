import { RowDataPacket } from 'mysql2';

export enum ScheduleType {
    FOOTBALL = 'football',
    BASKETBALL = 'basketball',
    PINGPONG = 'pingpong',
    BADMINTON = 'badminton',
    ATHLETICS = 'athletics'
}

export interface Location {
    locationId: number;
    name: string;
}

export interface ScheduleRow extends RowDataPacket {
    id: number;
    type: ScheduleType;
    time: string;
    team_A_id: number;
    team_B_id: number;
    locationId: number;
    team_A_name: string;
    team_A_image: string;
    team_A_color: string;
    team_B_name: string;
    team_B_image: string;
    team_B_color: string;
    location_name: string;
}


export interface Team {
    teamId: number;
    name: string;
    image: string;
    color_code: string;
}

export interface FormattedSchedule {
    scheduleId: number;
    type: ScheduleType;
    time: string;
    location: Location;
    teamA: Team;
    teamB: Team;
}
