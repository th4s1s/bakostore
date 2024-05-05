import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';



interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  cover: string;
}

const CuteProgress = styled(CircularProgress)(({ theme }) => ({
  color: '#f06292', 
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round' 
  }
}));


const NewsPage = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = newsData.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news/list.php`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Fetching news data failed', error);
    } finally {
      setIsLoading(false); // End loading regardless of the outcome
    }
  };
  

  return (
    <div className="container mt-24 h-screen mx-auto px-4">
      {/* Search Bar */}
      <div className="kawaii-search-bar">
    <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Tìm kiếm tin tức..."
        className="kawaii-search-input"
    />
        <i className="fa fa-search kawaii-search-icon"></i> 
    </div>  
      {/* Content Area */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CuteProgress />
        </div>
      ) : (
        filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <div key={news.id} className={`flex flex-wrap md:flex-nowrap my-4 ${index !== 0 ? 'pt-4 border-t-2 border-gray-200' : ''}`}>
              <div className="w-full md:w-1/3 lg:w-1/4">
                <Link to={`/news/${news.id}`}>
                  <img src={news.cover} alt={news.title} className="w-full h-auto"/>
                </Link>
              </div>
              <div className="flex flex-col justify-start w-full md:w-2/3 lg:w-3/4 p-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    <Link to={`/news/${news.id}`} className="text-pink-600 hover:text-pink-800">{news.title}</Link>
                  </h2>
                  <div className="text-sm text-gray-500">
                    <span>{news.date}</span>
                    <span className="mx-2">|</span>
                    <span className="text-pink-600">NEWS</span>
                  </div>
                </div>
                <div>
                  <p className="mt-2 text-gray-600">
                    {news.content.substring(0, 500)}{news.content.length > 100 ? "..." : ""}
                  </p>
                  <Link to={`/news/${news.id}`} className="text-pink-600 mt-1 hover:text-pink-800">Read more <i className="fa fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl mt-20">Không tìm thấy kết quả.</p>
        )
      )}
    </div>
  );
  }

export default NewsPage;
