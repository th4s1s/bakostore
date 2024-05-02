import React from 'react';
import { RouterLink } from "./router-link";
import { NotificationsButton } from './notifications-button';
import { AccountButton } from './account-button';
import { ShoppingCartButton } from './shopping-cart';

const NavbarLogged: React.FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-pink-200 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <img src="/logo.webp" alt="Logo" className="h-10 w-10 mr-2" />
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-lg lg:flex-grow">
          <RouterLink href="/" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-8">
            Trang Chủ
          </RouterLink>
          <RouterLink href="/shop" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-8">
            Cửa Hàng
          </RouterLink>
          <RouterLink href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-8">
            Liên Hệ
          </RouterLink>
          <RouterLink href="/news" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-8">
            Tin Tức
          </RouterLink>
          <RouterLink href="/about-us" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white">
            Về Chúng Tôi
          </RouterLink>
        </div>
        <div className="flex items-center space-x-4">
          <ShoppingCartButton />
          <NotificationsButton />
          <AccountButton />
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogged;
