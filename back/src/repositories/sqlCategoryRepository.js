import { pool } from "../utils/database.js";

export async function getCategories() {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  } catch (error) {
    console.error("Error Getting All Categories: ", error.message);
    throw error;
  }
}

export async function getArticleByCategory(categoryId) {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.content, j.id as journalistId, j.name as journalist, c.name as category \
       FROM articles a \
       JOIN journalists j ON j.id = a.journalistId \
       JOIN categories c on c.id = a.categoryId\
       WHERE c.id = ?
      `,
      categoryId
    );
    return rows;
  } catch (error) {
    console.error("Error fetch aritcles by category: ", error.message);
    throw error;
  }
}