import axios from "axios";
import { useState } from "react";
import ProductList from "../components/management/productlist";
import NewsList from "../components/management/newslist";
import UserList from "../components/management/userlist";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const userInfor = localStorage.getItem("user");
    // const [isAuth, setAuth] = useState(!(!userInfor));

    const [isUserMana,setUserMana] = useState(false);
    const [isProductMana,setProductMana] = useState(false);
    const [isNewsMana,setNewsMana] = useState(false);

    // data
    const [userList, setUserList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [newsList, setNewsList] = useState(null);

    const handleMana = (typ : string) => {
        // console.log("checker");
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
        if(userInfor){
            try {
                const infor = JSON.parse(userInfor);
                const formData = new URLSearchParams({
                    token: infor.token
                })
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/products/show.php`, {params:formData});
                setProductList(response.data)
            } catch (error) {
                // console.error('Error:', error);
                navigate("/hellodarknessmyoldfriend");
            }
        }
    }

    const handleShowNews = async () => {
        if(userInfor){
            try {
                const infor = JSON.parse(userInfor);
                const formData = new URLSearchParams({
                    token: infor.token
                })
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/news/show.php`, {params:formData});
                setNewsList(response.data)
            } catch (error) {
                // console.error('Error:', error);
                navigate("/hellodarknessmyoldfriend");
            }
        }
    }

    const handleShowUser = async () => {
        if(userInfor){
            const infor = JSON.parse(userInfor);
            const formData = new URLSearchParams({
                token: infor.token
            })
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users/show.php`, {params:formData});
                setUserList(response.data)
            } catch (error) {
                // console.error('Error:', error);
                navigate("/hellodarknessmyoldfriend");
            }
        }
    }

    const ManaPage = () => {
        return (
        <>
        <div className="flex flex-col gap-2">
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => { handleMana("user"); handleShowUser()}}
            >
                <h2 className="text-xl">Quản lý người dùng</h2>
                <p className="">Xem, xóa người dùng và thêm người quản trị</p>
            </button>
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => { handleMana("product"); handleShowProduct()}}
            >
                <h2 className="text-xl">Quản lý sản phẩm</h2>
                <p className="">Xem, xóa, thêm, chỉnh sửa sản phẩm</p>
            </button>
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => { handleMana("news"); handleShowNews()}}
            >
                <h2 className="text-xl">Quản lý tin tức</h2>
                <p className="">Xem, xóa, thêm, chỉnh sửa tin tức</p>
            </button>
        </div>
        </>
        );
    }
    const ShortCut = ({token}) => {
        // console.log(productList)
        // console.log(isAuth)
        if(userInfor){
            return (
                <>
                <div className="">
                    <div className="nav bg-pink-700 text-white p-4">
                        <ul className="flex justify-center gap-40">
                            <li className="mx-2"><a onClick={() => { handleMana("user"); handleShowUser()} } className={`${isUserMana ? 'underline' : ''} hover:underline`}>Quản lý Người dùng</a></li>
                            <li className="mx-2"><a onClick={() => { handleMana("product"); handleShowProduct()} } className={`${isProductMana ? 'underline' : ''} hover:underline`}>Quản lý Sản phẩm</a></li>
                            <li className="mx-2"><a onClick={() => { handleMana("news"); handleShowNews()} } className={`${isNewsMana ? 'underline' : ''} hover:underline`}>Quản lý Tin tức</a></li>
                            <li className="mx-2"><a onClick={() => { handleMana("return"); } } className={`hover:underline`}>Quay lại</a></li>
                        </ul>
                    </div>
                    {/* {isUserMana && <UserMana />} */}
                    {isProductMana && productList && <ProductList productData={productList} token={token}/>}
                    {isNewsMana && newsList && <NewsList newsData={newsList} token={token}/>}
                    {isUserMana && userList && <UserList userData={userList} token={token}/>}
                </div>
                </>
            );
        }
        else{
            return <Navigate to="/eb9e7f08551b80d86f6d94e03260c5cc6c64555566a70c4ee55d238b0c2e20d0673cd2240052c43a00c6f812d71ef3317f11c910a138b623725cb2a734d8ecf7" replace={true} />
        }
    }
    // checkAuth()
    if(userInfor){
        return (
        <>
        <div className="container mx-auto">
            {
            (isUserMana || isProductMana || isNewsMana) ?
            <ShortCut token={JSON.parse(userInfor).token} />
            : <ManaPage />
            }
        </div>
        </>
        );
    }
    else
    {
        return <Navigate to="/login" replace={true} />
    }
}

export default Admin
