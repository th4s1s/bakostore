/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth(); 
  const { addProductToCart } = useCartContext(); 

  useEffect(() => {
    fetch(`/api/product/detail.php?id=${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [productId]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

const handleAddToCart = (): void => {
  if (user && product) {
      addProductToCart(product.id, product.name, product.price, quantity, product.image)
      .then(() => {
        alert('Added to cart successfully!');
      })
      .catch((error: any) => {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart.');
      });
  } else {
    alert('You need to be logged in to add items to the cart.');
  }
};

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-5/12">
          <img src={product.image} alt={product.name} className="w-full" />
        </div>
        <div className="w-full lg:w-7/12 pl-16">
          <h1 className="mt-12 text-3xl font-semibold">{product.name}</h1>
          <p className="text-lg text-gray-700 mt-2">{product.description}</p>
          <p className="text-3xl text-pink-500 mt-2 font-bold">{product.price} đ</p>
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
            <button onClick={handleAddToCart} className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
