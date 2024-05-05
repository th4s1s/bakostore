/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import StarRating from '../../components/rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';



interface Comment {
  id: string;
  pid: number;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string;
  username: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  rating: string;
  comments: Comment[];

}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const { user } = useAuth(); 
  const { addProductToCart } = useCartContext(); 


  const fetchProductDetails = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/detail.php?id=${productId}`);
        if (response.data) {
            console.log(response.data)
            setProduct(response.data);
            console.log("Product details fetched:", response.data);
        }
    } catch (error) {
        console.error("Failed to fetch product details:", error);
    }
};

useEffect(() => {
    fetchProductDetails();
}, [productId]);


  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async (): Promise<void> => {
    if (user && product) {
      try {
        await addProductToCart(product.id, product.name, product.price, quantity, product.image);
        toast.success('Thêm vào giỏ hàng thành công!');
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Error adding to cart.');
      }
    } else {
      toast.error('Bạn phải đăng nhập mới được thêm vào giỏ hàng nhé.');   
     }
  };

  const handleRatingChange = (newRating: number) => {
    console.log(newRating)
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value)
    setComment(event.target.value);
  };
 
  

  const handleDeleteComment = async (commentId: string) => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để thực hiện hành động này.');
      return;
    }
  
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const postData = new URLSearchParams();
        postData.append('id', commentId);
        postData.append('token', user.token);
        if (user.is_admin === 0) {
          postData.append('username', user.username);
        }
  
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/comment/delete.php`, postData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          if (response.status === 200) {
            toast.success('Bình luận đã được xóa.');
            fetchProductDetails(); 
          } else {
            toast.error('Không thể xóa bình luận.');
          }
        }).catch(error => {
          console.error('Error deleting comment:', error);
          toast.error('Lỗi khi xóa bình luận.');
        });
      }
    });
  };
  
  

  const handlePostComment = async () => {
    if (!user) {
      toast.error('Bạn phải đăng nhập mới được đánh giá nhé.');
      return;
    }
  
    if (!productId) {
      toast.error('Product ID is not available.');
      return;
    }
  
    if (!comment) {
      toast.error('Vui lòng nhập bình luận.');
      return;
    }
  
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá.');
      return;
    }
  
    setIsPostingComment(true); // Disable the button when the post operation starts
    const urlEncodedData = `pid=${encodeURIComponent(productId)}&username=${encodeURIComponent(user.username)}&comment=${encodeURIComponent(comment)}&rating=${encodeURIComponent(rating)}&token=${encodeURIComponent(user.token)}`;
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/comment/add.php`, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      if (response.status === 201) {
        toast.success("Đăng bình luận thành công!");
        setComment('');
        setRating(0);
        fetchProductDetails(); // Fetch again to show the new comment
      } else {
        alert('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Error posting comment');
    } finally {
      setIsPostingComment(false); // Re-enable the button after the operation
    }
  };
  
  
  
  
  const handleCancelComment = () => {
    setComment('');
    setRating(0);
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-5/12">
                <img src={product.image} alt={product.name} className="w-full" />
            </div>
            <div className="w-full lg:w-7/12 pl-16">
                <h1 className="mt-12 text-3xl font-semibold text-pink-500">{product.name}</h1>
                <p className="text-lg text-gray-700 mt-2">{product.description}</p>
                <p className="text-3xl mt-2 font-bold text-pink-600">{`${product.price.toLocaleString()}đ`}</p>
                <div className="mt-4 flex items-center">
            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="text-gray-600 border border-gray-400 hover:bg-gray-200 focus:outline-none rounded-l-md px-3 py-2">
              -
            </button>
                <input type="text" className="w-12 text-center border-t border-b border-gray-400 py-2 focus:outline-none" value={quantity} readOnly/>
                <button onClick={() => handleQuantityChange(1)} className="text-gray-600 border border-gray-400 hover:bg-gray-200 focus:outline-none rounded-r-md px-3 py-2">
                  +
                </button>
              </div>
              <div className="mt-4">
              <button onClick={handleAddToCart} className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Thêm vào giỏ hàng</button>
            </div>
            </div>
            <div className="w-full mt-8 flex flex-col items-center">
                <div className="bg-pink-100 rounded-xl shadow p-6 w-full">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-semibold text-pink-600">Đánh giá sản phẩm này</h2>
                  <div className="flex justify-center items-center">
                  <StarRating value={rating} onChange={handleRatingChange} />
                  </div>
                </div>
                    <textarea
                        className="form-textarea mt-1 block w-full border-2 border-pink-300 rounded-lg shadow-sm focus:ring focus:ring-pink-500 focus:ring-opacity-50 p-3"
                        rows={4}
                        value={comment}
                        placeholder="Viết bình luận vào đây"
                        onChange={handleCommentChange}
                    >
                    </textarea>
                    <div className="flex justify-end gap-4 mt-4">
                    <button onClick={handlePostComment} disabled={isPostingComment} className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none">
                      Đăng
                    </button>
                        <button onClick={handleCancelComment} className="bg-white text-pink-500 py-2 px-4 rounded border border-pink-500 hover:bg-pink-100 focus:outline-none">Hủy</button>
                    </div>
                    <div className="mt-4">
                    {product.comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-md p-4 shadow mb-4 flex gap-4 items-center relative">
                      <img src={comment.avatar} alt="Avatar" className="h-12 w-12 rounded-full" />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{comment.name}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-800">{comment.comment}</p>
                        <div className="text-yellow-400">
                          {'★'.repeat(comment.rating)}
                          {'☆'.repeat(5 - comment.rating)}
                        </div>
                        {user && (user.is_admin === 1 || user.username === comment.username) && (
                          <IconButton 
                            aria-label="delete" 
                            onClick={() => handleDeleteComment(comment.id)} 
                            sx={{ position: 'absolute', bottom: 8, right: 8 }}
                            >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default ProductDetail;
