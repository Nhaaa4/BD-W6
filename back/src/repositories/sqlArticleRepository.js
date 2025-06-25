//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import { pool } from "../utils/database.js";

// Get all articles
export async function getArticles() {
  // TODO
  try {
    const [rows] = await pool.query(
      "SELECT a.id, a.title, a.content, j.id as journalistId, j.name as journalist, c.name as category \
       FROM articles a\
       JOIN journalists j ON j.id = a.journalistId\
       JOIN categories c on c.id = a.categoryId"
    );
    return rows;
  } catch (error) {
    console.error("Error Getting All Articles: ", error.message);
    throw error;
  }
}

// Get one article by ID
export async function getArticleById(id) {
  // TODO
  try {
    const [rows] = await pool.query(
      `SELECT a.title, a.content, j.name as journalist, c.name as category \
       FROM articles a \
       JOIN journalists j ON j.id = a.journalistId \
       JOIN categories c on c.id = a.categoryId\
       WHERE a.id = ?`,
      id
    );
    return rows[0];
  } catch (error) {
    console.error(`Error Getting Articles By ${id}: `, error.message);
    throw error;
  }
}

// Create a new article
export async function createArticle(article) {
  // TODO
  try {
    return await pool.query(
      "INSERT INTO articles(title, content, journalistId, categoryId) values (?, ?, ?, ?)",
      [article.title, article.content, article.journalistId, article.category]
    );
  } catch (error) {
    console.error("Error Creating Articles: ", error.message);
    throw error;
  }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  // TODO
  try {
    return await pool.query(
      "UPDATE articles SET title = ?, content = ?, journalistId = ?, categoryId = ? WHERE id = ?",
      [
        updatedData.title,
        updatedData.content,
        updatedData.journalistId,
        updatedData.category,
        id,
      ]
    );
  } catch (error) {
    console.error("Error Creating Articles: ", error.message);
    throw error;
  }
}

// Delete an article by ID
export async function deleteArticle(id) {
  try {
    return await pool.query("DELETE FROM articles WHERE id = ?", id);
  } catch (error) {
    console.error("Error Creating Articles: ", error.message);
    throw error;
  }
}

export async function getArticleByCategoryAndJournalist(cId, jId) {
  try {
    const [rows] = await pool.query(
      "SELECT a.id, a.title, a.content, j.id as journalistId, j.name as journalist, c.name as category \
       FROM articles a\
       JOIN journalists j ON j.id = a.journalistId\
       JOIN categories c on c.id = a.categoryId\
       WHERE c.id = ? AND j.id = ?",
       [cId, jId]
    );
    return rows;
  } catch (error) {
    console.error("Error Getting Articles By Journalist and category: ", error.message);
    throw error;
  }
}
