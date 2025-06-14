import * as categoryRepository from '../repositories/sqlCategoryRepository.js'

export async function getAllCategories(req, res) {
  try {
    const categories = await categoryRepository.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getArticleByCategoryId(req, res) {
  try {
    const articles = await categoryRepository.getArticleByCategory(req.params.id);
    if (!articles) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(articles);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}