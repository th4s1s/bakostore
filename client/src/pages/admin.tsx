import axios from "axios";
import { useState } from "react";
import ProductList from "../components/management/productlist";
import NewsList from "../components/management/newslist";
import UserList from "../components/management/userlist";

const Admin = () => {
    // const navigate = useNavigate();
    const userInfor = localStorage.getItem("user");
    const [isAuth, setAuth] = useState(!(!userInfor));

    const checkAuth = async () => {
        // console.log("checkAuth")
        if(userInfor){
            const infor = JSON.parse(userInfor);
            const formData = new URLSearchParams({
                username: infor.username,
                token: infor.token,
            });
            try {
                //localhost
                const response = await axios.post(`/api/admin/auth.php`, formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                setAuth(true)
                // console.log(response.data)
            } catch (error) {
                // console.error('Error:', error);
                setAuth(false)
            }
        } else {
            setAuth(false)
        }
    }

    const [isUserMana,setUserMana] = useState(false);
    const [isProductMana,setProductMana] = useState(false);
    const [isNewsMana,setNewsMana] = useState(false);

    // data
    const [userList, setUserList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [newsList, setNewsList] = useState(null);

    const handleMana = (typ : string) => {
        console.log("checker");
        if(typ === "user"){
            setUserMana(true);
            setProductMana(false);
            setNewsMana(false);
        } else if(typ === "product"){
            setUserMana(false);
            setProductMana(true);
            setNewsMana(false);
        } else if(typ === "news"){
            setUserMana(false);
            setProductMana(false);
            setNewsMana(true);
        } else {
            setUserMana(false);
            setProductMana(false);
            setNewsMana(false);
        }
    }

    //handle for products
    const handleShowProduct = async () => {
        if(isAuth){
            try {
                const response = await axios.get(`/api/admin/products/show.php`);
                setProductList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const handleShowNews = async () => {
        if(isAuth){
            try {
                const response = await axios.get(`/api/admin/news/show.php`);
                setNewsList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const handleShowUser = async () => {
        if(isAuth){
            try {
                const response = await axios.get(`/api/admin/users/show.php`);
                setUserList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const ManaPage = () => {
        return (
        <>
        <div className="flex flex-col gap-2">
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => {checkAuth(); handleMana("user"); handleShowUser()}}
            >
                <h2 className="text-xl">Quản lý người dùng</h2>
                <p className="">Xem, xóa, thêm người dùng</p>
            </button>
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => {checkAuth(); handleMana("product"); handleShowProduct()}}
            >
                <h2 className="text-xl">Quản lý sản phẩm</h2>
                <p className="">Xem, xóa, thêm, chỉnh sửa sản phẩm</p>
            </button>
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => {checkAuth(); handleMana("news"); handleShowNews()}}
            >
                <h2 className="text-xl">Quản lý tin tức</h2>
                <p className="">Xem, xóa, thêm, chỉnh sửa tin tức</p>
            </button>
        </div>
        </>
        );
    }
    const ShortCut = () => {
        // console.log(productList)
        return (
            <>
            <div className="">
                <div className="nav bg-pink-700 text-white p-4">
                    <ul className="flex justify-center gap-40">
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("user"); handleShowUser()} } className={`${isUserMana ? 'underline' : ''} hover:underline`}>Quản lý Người dùng</a></li>
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("product"); handleShowProduct()} } className={`${isProductMana ? 'underline' : ''} hover:underline`}>Quản lý Sản phẩm</a></li>
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("news"); handleShowNews()} } className={`${isNewsMana ? 'underline' : ''} hover:underline`}>Quản lý Tin tức</a></li>
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("return"); } } className={`hover:underline`}>Quay lại</a></li>
                    </ul>
                </div>
                {/* {isUserMana && <UserMana />} */}
                {isProductMana && productList && <ProductList productData={productList}/>}
                {isNewsMana && newsList && <NewsList newsData={newsList}/>}
                {isUserMana && userList && <UserList userData={userList}/>}
            </div>
            </>
        );
    }
    // checkAuth()
    if(isAuth){
        return (
        <>
        <div className="container mx-auto">
            {
            (isUserMana || isProductMana || isNewsMana) ?
            <ShortCut />
            : <ManaPage />
            }
        </div>
        </>
        );
    }
}

export default Admin
