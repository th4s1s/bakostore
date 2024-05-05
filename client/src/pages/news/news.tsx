import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  cover: string;
}


const NewsPage = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch('/api/news/list.php');
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Fetching news data failed', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {newsData.map((news, index) => (
        <div key={news.id} className={`flex flex-wrap md:flex-nowrap my-4 ${index !== 0 ? 'pt-4 border-t-2 border-gray-200' : ''}`}>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Link to={`/news/${news.id}`}>
              <img src={news.cover} alt="News" className="w-full h-auto"/>
            </Link>
          </div>
          <div className="dd flex flex-col justify-start w-full md:w-2/3 lg:w-3/4 p-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                <Link to={`/news/${news.id}`} className="text-pink-600 hover:text-pink-800">{news.title}</Link>
              </h2>
              <div className="text-sm text-gray-500">
                <span>{news.date}</span>
                <span className="mx-2">|</span>
                <span className="text-pink-600">TIN TỨC</span>
              </div>
            </div>
            <div>
              <p className="mt-2 text-gray-600">
                {news.content.substring(0, 500)}{news.content.length > 100 ? "..." : ""}
              </p>
              <Link to={`/news/${news.id}`} className="text-pink-600 mt-1 hover:text-pink-800">Xem thêm <i className="fa fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
