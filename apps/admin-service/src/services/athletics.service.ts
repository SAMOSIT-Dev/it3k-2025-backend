import { pool } from "../database/database";
import { GroupedMatch } from "../models/athleticsMatch.model";

const AthleticService = {
    async getMatchById(id: string): Promise<GroupedMatch[]> {
        try {
            const [rows] = await pool.execute(`
                SELECT 
                    am.*,
                    ua.uniName AS team_A_name, ua.image AS team_A_image, ua.color_code AS team_A_color,
                    ub.uniName AS team_B_name, ub.image AS team_B_image, ub.color_code AS team_B_color,
                    uc.uniName AS team_C_name, uc.image AS team_C_image, uc.color_code AS team_C_color,
                    ud.uniName AS team_D_name, ud.image AS team_D_image, ud.color_code AS team_D_color,
                    l.name AS location_name
                FROM athletics_matches am
                JOIN universities ua ON am.team_A_id = ua.id
                JOIN universities ub ON am.team_B_id = ub.id
                JOIN universities uc ON am.team_C_id = uc.id
                JOIN universities ud ON am.team_D_id = ud.id
                JOIN locations l ON am.locationId = l.id
                WHERE am.id = ?
            `, [id]);

            return rows as GroupedMatch[];
        } catch (err) {
            throw new Error(err);
        }
    },
    async getMatchByEvent(event: string): Promise<GroupedMatch[]> {
        try {
            const [rows] = await pool.execute(`
                SELECT 
                    am.*,
                    ua.uniName AS team_A_name, ua.image AS team_A_image, ua.color_code AS team_A_color,
                    ub.uniName AS team_B_name, ub.image AS team_B_image, ub.color_code AS team_B_color,
                    uc.uniName AS team_C_name, uc.image AS team_C_image, uc.color_code AS team_C_color,
                    ud.uniName AS team_D_name, ud.image AS team_D_image, ud.color_code AS team_D_color,
                    l.name AS location_name
                FROM athletics_matches am
                JOIN universities ua ON am.team_A_id = ua.id
                JOIN universities ub ON am.team_B_id = ub.id
                JOIN universities uc ON am.team_C_id = uc.id
                JOIN universities ud ON am.team_D_id = ud.id
                JOIN locations l ON am.locationId = l.id
                WHERE am.event = ?
            `, [event]);

            return rows as GroupedMatch[];
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default AthleticService;