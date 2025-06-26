import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticlesByJournalist, removeArticle } from "../services/api";

export default function ArticlesByJournalist() {
  const { id } = useParams()
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
        fetchArticlesByJournalist(id); // Fetch all articles when component mounts
    }
  }, [id]);

  const fetchArticlesByJournalist = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticlesByJournalist(id);
      setArticles(data);
      setName(data[0].journalist)
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticlesByJournalist(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/${id}`);

  const handleViewByJournalist = (id) => navigate(`/journalists/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="article-title">{name}</div>
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
            onJournalist={handleViewByJournalist}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onJournalist, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div
        className="article-author"
        onClick={() => onJournalist(article.journalist)}
      >
        By {article.journalist}
      </div>

      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
