import { updateBasketballScoreDTO } from "../dto/basketballMatch.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

const BasketBallService = {
    async updateBasketballScore(payload) {
        try {
            const { error, value } = updateBasketballScoreDTO.validate(payload);
            if (error) {
                throw new Error(error.details[0].message);
            }

            const { score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT, id } = value;
            const query = `UPDATE basketball_matches SET score_A_Q1 = ?, score_A_Q2 = ?, score_B_Q1 = ?, score_B_Q2 = ?, score_A_OT = ?, score_B_OT = ? WHERE id = ?`;
            const [result] = await pool.query<ResultSetHeader>(query, [score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT, id]);
            if (result.affectedRows === 0) {
                throw new Error('Basketball match not found');
            }

            console.log(`Basketball match ${id} score updated`);
        } catch (error) {
            console.error('Error updating basketball score:', error);
        }
    }
}

export default BasketBallService