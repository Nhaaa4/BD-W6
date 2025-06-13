import * as journalistRepository from "../repositories/sqlJournalistRepository.js";

export async function getAllJournalists(req, res) {
  try {
    const journalists = await journalistRepository.getJournalists();
    res.json(journalists);
  } catch (error) {
    console.error("Error fetching journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getArticleByJournalistId(req, res) {
  try {
    const articles = await journalistRepository.getArticleByJournalist(req.params.id);
    if (!articles) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(articles);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}
