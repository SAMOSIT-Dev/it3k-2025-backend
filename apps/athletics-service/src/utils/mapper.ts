import { GroupedMatch, University } from "../model/athleticsMatch.model";

export const groupMatchesByEvent = (matches: any[]): GroupedMatch[] => {
    const groupedMatches: Record<string, GroupedMatch> = {};

    matches.forEach((match) => {
        const event = match.event;

        if (!groupedMatches[event]) {
            groupedMatches[event] = {
                event: match.event,
                time: match.time,
                location: match.location_name,
                teams: [],
            };
        }

        const currentTeams = groupedMatches[event].teams;
        const teamMap = new Map(currentTeams.map((team) => [team.id, team]));

        const newTeams: University[] = [
            { id: match.team_A_id, uniName: match.team_A_name, image: match.team_A_image, colorCode: match.team_A_color, ranking: match.score_A },
            { id: match.team_B_id, uniName: match.team_B_name, image: match.team_B_image, colorCode: match.team_B_color, ranking: match.score_B },
            { id: match.team_C_id, uniName: match.team_C_name, image: match.team_C_image, colorCode: match.team_C_color, ranking: match.score_C },
            { id: match.ranking, uniName: match.team_D_name, image: match.team_D_image, colorCode: match.team_D_color, ranking: match.score_D },
        ];

        newTeams.forEach((team) => {
            teamMap.set(team.id, team);
        });

        groupedMatches[event].teams = Array.from(teamMap.values());
    });

    return Object.values(groupedMatches)
};