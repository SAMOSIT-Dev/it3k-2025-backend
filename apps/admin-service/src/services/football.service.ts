import { createFootballDTO, updateFootballScoreDTO } from "../dto/footballMatch.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

export const createFootballMatch = async (payload) => {
    try {
        const { error, value } = createFootballDTO.validate(payload);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { team_A_id, team_B_id, timeStart, timeEnd, locationId } = value;
        const query = `INSERT INTO football_matches (team_A_id, team_B_id, timeStart, timeEnd, locationId) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [team_A_id, team_B_id, timeStart, timeEnd, locationId]);

        return {
            success: true,
            message: 'Football match created successfully',
            data: { id: result.insertId, team_A_id, team_B_id, timeStart, timeEnd, locationId }
        }
    } catch (error) {
        console.error('Error creating football match:', error);
    }
}

export const updateFootballScore = async (payload) => {
    try {
        const { error, value } = updateFootballScoreDTO.validate(payload);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { score_A, score_B, id } = value
        const query = `UPDATE football_matches SET score_A = ?, score_B = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [score_A, score_B, id]);

        if (result.affectedRows === 0) {
            throw new Error('Football match not found');
        }

        console.log(`Football match ${id} updated successfully!`);
        console.log("New score:", { score_A, score_B });
    } catch (error) {
        console.error('Error updating football score:', error);
    }
}
