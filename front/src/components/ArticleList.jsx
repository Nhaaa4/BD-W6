import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, getJournalists, getCategories, removeArticle, getArticlesByJournalist, getArticlesByCategory, getArticlesByCategoryAndJournalist } from "../services/api";

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectCategory, setSelectCategory] = useState("")
  const [selectJournalist, setSelectJournalist] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
    fetchJournalists()
    fetchCategories()
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJournalists = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getJournalists();
      setJournalists(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticlesByJournalist = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticlesByJournalist(id);
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticlesByCategory = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticlesByCategory(id);
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchArticlesByCategoryAndJournalist = async (cId, jId) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticlesByCategoryAndJournalist(cId, jId);
      setArticles(data);
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
      await fetchArticles(); // refresh the list
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

  const handleSelectCategory = (e) => {
    setSelectCategory(e.target.value)
  }

  const handleSelectJournalist = (e) => {
    setSelectJournalist(e.target.value)
  }

  const handleApply = () => {
    if (selectCategory !== "" && selectJournalist !== "") {
      fetchArticlesByCategoryAndJournalist(selectCategory, selectJournalist)
    } else if (selectJournalist !== "") {
      fetchArticlesByJournalist(Number(selectJournalist))
    } else if (selectCategory !== "") {
      fetchArticlesByCategory(Number(selectCategory))
    } else {
      fetchArticles()
    }
  }

  const handleReset = () => {
    fetchArticles()
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="article-list">
        <select value={selectJournalist} onChange={handleSelectJournalist}>
          <option value="">(Select One)</option>
          {journalists.map(journalist => 
           <option value={journalist.id}>{journalist.name}</option>
          )}
        </select>
        <select value={selectCategory} onChange={handleSelectCategory}>
          <option value="">(Select One)</option>
          {categories.map(category => 
           <option value={category.id}>{category.name}</option>
          )}
        </select>
        <div className="article-list">
          <div className="button-tertiary" onClick={handleApply}>Apply</div>
          <div className="button-secondary" onClick={handleReset}>Reset</div>
        </div>
      </div>
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
      <div className="article-author" onClick={() => onJournalist(article.journalistId)}>By {article.journalist}</div>

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
