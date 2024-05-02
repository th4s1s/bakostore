




const NewsPage = () => {
  return (
    <div className="container mx-auto px-4">
      {newsData.map((news, index) => (
        <div key={news.id} className={`flex flex-wrap md:flex-nowrap my-4 ${index !== 0 ? 'pt-4 border-t-2 border-gray-200' : ''}`}>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <a href={news.link}>
              <img src={news.imageUrl} alt="News" className="w-full h-auto"/>
            </a>
          </div>
          <div className="dd flex flex-col justify-start w-full md:w-2/3 lg:w-3/4 p-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                <a href={news.link}>{news.title}</a>
              </h2>
              <div className="text-sm text-gray-500">
                <span>{news.date}</span>
                <span className="mx-2">|</span>
                <a href="#" className="text-pink-600">TIN TỨC</a>
              </div>
            </div>
            <div>
              <p className="mt-2 text-gray-600">
                {news.summary}
              </p>
              <a href={news.link} className="text-pink-600 mt-1">Xem thêm <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
