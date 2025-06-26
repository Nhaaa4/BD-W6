import { pool } from "../utils/database.js";

export async function getJournalists() {
  try {
    const [rows] = await pool.query("SELECT * FROM journalists");
    return rows;
  } catch (error) {
    console.error("Error Getting All Journalists: ", error.message);
    throw error;
  }
}

export async function getArticleByJournalist(journalistId) {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.content, j.id as journalist, c.id as category \
       FROM articles a \
       JOIN journalists j ON j.id = a.journalistId \
       JOIN categories c on c.id = a.categoryId\
       WHERE j.id = ?
      `,
      journalistId
    );
    return rows;
  } catch (error) {
    console.error("Error fetch aritcles by journalist: ", error.message);
    throw error;
  }
}
