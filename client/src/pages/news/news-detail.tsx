import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';

interface NewsItem {
    id: string;
    title: string;
    date: string;
    content: string;
    cover: string; 
  }

const NewsDetail = () => {
    const { id } = useParams();  // Get the news ID from the URL
    const [news, setNews] = useState<NewsItem | null>(null); // Single news item
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
        const fetchNewsDetail = async () => {
          setLoading(true);
          try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news/detail.php?id=${id}`);
            if (!response.ok) {
              throw new Error('Could not fetch news details');
            }
            const data = await response.json();
            setNews(data);
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unexpected error occurred');
            }
          } finally {
            setLoading(false);
          }
        };

      fetchNewsDetail();
    }, [id]);
  
    if (loading) return <CircularProgress color="secondary" />;
    if (error) return <Typography color="error">{error}</Typography>;
  
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        {news ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {news.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(news.date).toLocaleDateString()}
            </Typography>
            <Box component="img" src={news.cover} sx={{ width: '100%', height: 'auto', my: 2 }} />
            <Typography variant="body1">
            {news.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
                ))}            
                </Typography>
          </>
        ) : (
          <Typography>No news found.</Typography>
        )}
      </Box>
    );
  };
  
  export default NewsDetail;
  