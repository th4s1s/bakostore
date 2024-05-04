/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { ChangeEvent, useState } from "react";
// import { useNavigate } from 'react-router-dom';

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

    const [userList,setUserList] = useState(null);
    const [productList,setProductList] = useState(null);
    const [newsList,setNewsList] = useState(null);

    const [toggleEdit, setEdit] = useState(false);

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

    //user
    const handleShowUser = async () => {
        if(isAuth){
            try {
                //localhost
                const response = await axios.get(`/api/admin/users/show.php`);
                // console.log(response.data)
                setUserList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    const handleDeleteUser = async (username : string) => {
        if(isAuth && userInfor){
            const infor = JSON.parse(userInfor);
            const formData = new URLSearchParams({
                username: username,
            });
            try {
                //localhost
                const response = await axios.post(`/api/admin/users/remove.php`, formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                handleShowUser();
            } catch (error) {

            }
        }
    }

    //product
    const [showMore, setShowMore] = useState(false);
    const [productFormData, setProductFormData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        type:'',
        fileToUpload: null
    });

    const handleChangeInForm = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProductFormData({ ...productFormData, [name]: value });
    };
    const handleChangeInFormImg = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        // console.log(files[0])
        setProductFormData({ ...productFormData, [name]: files[0] });
    };

    const toggleShowMore = (index: string | number) => {
        setShowMore(prevState => ({
          ...prevState,
          [index]: !prevState[index]
        }));
      };

    const handleShowProduct = async () => {
        if(isAuth){
            try {
                //localhost
                const response = await axios.get(`/api/admin/products/show.php`);
                // console.log(response.data)
                setProductList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    const handleDeleteProduct = async (id : string) => {
        if(isAuth && userInfor){
            const formData = new URLSearchParams({
                id: id,
            });
            try {
                //localhost
                const response = await axios.post(`/api/admin/products/remove.php`, formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                handleShowProduct();
            } catch (error) {

            }
        }
    }

    const handleUpdateProduct = async (id: string, name: string, description: string, price: any, type: string, file: any) => {
        console.log(file)
        if(isAuth && userInfor){
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("type", type);
            formData.append("fileToUpload", file);
            try {
                //localhost
                const response = await axios.post(`/api/admin/products/update.php`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                handleShowProduct();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    //news
    const handleShowNews = async () => {
        if(isAuth){
            try {
                //localhost
                const response = await axios.get(`/api/admin/news/show.php`);
                // console.log(response.data)
                setNewsList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const handleDeleteNews = async (id : string) => {
        if(isAuth && userInfor){
            const formData = new URLSearchParams({
                id: id,
            });
            try {
                //localhost
                const response = await axios.post(`/api/admin/news/remove.php`, formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                handleShowNews();
            } catch (error) {

            }
        }
    }
    //popup
    const [showDialog, setShowDialog] = useState(false);
    const [showInputForm, setShowInputForm] = useState(false);

    const handleShowDialog = (index: any) => {
        setShowDialog((prev) => ({
            ...prev,
            [index]: true,
        }));
    };
    const handleHideDialog = (index: any) => {
        setShowDialog((prev) => ({
            ...prev,
            [index]: false,
        }));
    };

    const handleShowInputForm = (index: any) => {
        setShowInputForm((prev) => ({
            ...prev,
            [index]: true,
        }));
    };

    const handleHideInputForm = (index: any) => {
        setShowInputForm((prev) => ({
            ...prev,
            [index]: false,
        }));
    };
    const UserMana = () => {
        if(isAuth){
            return (
                <>
                    {/* <button onClick={() => {handleShowUser()}}>Click me</button> */}
                    { userList &&
                    <div className="nav bg-pink-100 text-black shadow">
                    <table className="table-auto w-full text-center">
                        <thead>
                        <tr>
                            <th className="border border-black px-4 py-2">Username</th>
                            {/* <th className="border border-black px-4 py-2">Password</th> */}
                            <th className="border border-black px-4 py-2">Name</th>
                            <th className="border border-black px-4 py-2">Phone</th>
                            <th className="border border-black px-4 py-2">Token</th>
                            <th className="max-w-[50px]">
                                <button className={`transition ease-in-out delay-50 px-4 py-2 rounded-lg shadow-lg duration-300 ${toggleEdit ? 'bg-pink-500 text-white' : 'bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white'}`}
                                        onClick={() => {setEdit(!toggleEdit)}}
                                >
                                    Bật / tắt chỉnh sửa
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList.map((user, index) => (
                            <tr key={index}>
                            <td className="border border-black px-4 py-2 max-w-[100px]" style={{ wordWrap: 'break-word' }}>{user.username}</td>
                            {/* <td className="border border-black px-4 py-2 overflow-hidden whitespace-nowrap max-w-[400px]">{user.password}</td> */}
                            <td className="border border-black px-4 py-2 max-w-[100px]" style={{ wordWrap: 'break-word' }}>{user.name}</td>
                            <td className="border border-black px-4 py-2 max-w-[100px]" style={{ wordWrap: 'break-word' }}>{user.phone}</td>
                            <td className="border border-black px-4 py-2 max-w-[300px]" style={{ wordWrap: 'break-word' }}>{user.token}</td>
                            <td className="px-4 py-2 max-w-[50px]">
                                <button
                                    className={`transition ease-in-out delay-50 bg-white hover:-translate-y-0.5 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 w-14 rounded-lg shadow-lg ${toggleEdit ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
                                    onClick={() => {handleShowDialog(index)}}
                                >
                                Xóa
                                </button>
                                {showDialog[index] && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-0"
                                            onClick={() => handleHideDialog(index)}
                                    >
                                        <div className="bg-white p-4 rounded-lg shadow-lg">
                                            <p className="text-lg text-gray-800 mb-4">Xóa người dùng {user.username}</p>
                                            <div className="flex justify-end">
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-2"
                                                    onClick={() => {checkAuth(); handleDeleteUser(user.username)}}
                                                >
                                                    Xóa
                                                </button>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg"
                                                    onClick={() => handleHideDialog(index)}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    }
                </>
            );
        }
    }

    const ProductMana = () => {
        if(isAuth){
            return (
                <>
                    {/* <button onClick={() => {handleShowUser()}}>Click me</button> */}
                    { productList &&
                    <div className="nav bg-pink-100 text-black shadow">
                    <table className="table-auto w-full text-center">
                        <thead>
                        <tr>
                            <th className="border border-black">ID</th>
                            {/* <th className="border border-black px-4 py-2">Password</th> */}
                            <th className="border border-black">Tên</th>
                            <th className="border border-black">Desc</th>
                            <th className="border border-black">Price</th>
                            <th className="border border-black">Loại</th>
                            <th className="border border-black max-w-[40px]">Đánh giá</th>
                            <th className="max-w-[50px]">
                                <button className={`transition ease-in-out delay-50 px-4 py-2 rounded-lg shadow-lg duration-300 ${toggleEdit ? 'bg-pink-500 text-white' : 'bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white'}`}
                                        onClick={() => {setEdit(!toggleEdit)}}
                                >
                                    Bật / tắt chỉnh sửa
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {productList.map((product, index) => (
                            <tr key={index}>
                            <td className="border border-black py-2 max-w-[10px]" style={{ wordWrap: 'break-word' }}>{product.id}</td>
                            {/* <td className="border border-black px-4 py-2 overflow-hidden whitespace-nowrap max-w-[400px]">{user.password}</td> */}
                            <td className="border border-black py-2 max-w-[100px]" style={{ wordWrap: 'break-word' }}>{product.name}</td>
                            <td className="border border-black py-2 max-w-[300px]" style={{ wordWrap: 'break-word' }}>
                            {showMore[index] ? product.description : `${product.description.slice(0, 100)}`}
                                {product.description.length > 100 && (
                                <span className="text-blue-500 cursor-pointer" onClick={() => toggleShowMore(index)}>
                                    {showMore[index] ? " Thu gọn" : " ...xem thêm"}
                                </span>
                            )}
                            </td>
                            <td className="border border-black py-2 max-w-[50px]" style={{ wordWrap: 'break-word' }}>{product.price}</td>
                            <td className="border border-black py-2 max-w-[30px]" style={{ wordWrap: 'break-word' }}>{product.type}</td>
                            <td className="border border-black py-2 max-w-[30px]" style={{ wordWrap: 'break-word' }}>{product.rating}</td>
                            <td className="px-4 py-2 max-w-[50px]">
                                <button
                                    className={`transition ease-in-out delay-50 bg-white hover:-translate-y-0.5 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 w-14 rounded-lg shadow-lg ${toggleEdit ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
                                    onClick={() => {}}
                                >
                                Edit
                                </button>
                                <button
                                    className={`transition ease-in-out delay-50 bg-white hover:-translate-y-0.5 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 w-14 rounded-lg shadow-lg ${toggleEdit ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
                                    onClick={() => {handleShowDialog(index)}}
                                >
                                Xóa
                                </button>
                                {showDialog[index] && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-0"
                                            onClick={() => handleHideDialog(index)}
                                    >
                                        <div className="bg-white p-4 rounded-lg shadow-lg">
                                            <p className="text-lg text-gray-800 mb-4">Xóa sản phẩm {product.name}</p>
                                            <div className="flex justify-end">
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-2"
                                                    onClick={() => {checkAuth(); handleDeleteProduct(product.id)}}
                                                >
                                                    Xóa
                                                </button>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg"
                                                    onClick={() => handleHideDialog(index)}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    }
                </>
            );
        }
    }

    const NewsMana = () => {
        if(isAuth){
            return (
                <>
                    {/* <button onClick={() => {handleShowUser()}}>Click me</button> */}
                    { newsList &&
                    <div className="nav bg-pink-100 text-black shadow">
                    <table className="table-auto w-full text-center">
                        <thead>
                        <tr>
                            <th className="border border-black">Id</th>
                            {/* <th className="border border-black px-4 py-2">Password</th> */}
                            <th className="border border-black">Tựa</th>
                            <th className="border border-black">Nội dung</th>
                            <th className="border border-black">Date</th>
                            <th className="max-w-[40px]">
                                <button className={`transition ease-in-out delay-50 px-4 py-2 rounded-lg shadow-lg duration-300 ${toggleEdit ? 'bg-pink-500 text-white' : 'bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white'}`}
                                        onClick={() => {setEdit(!toggleEdit)}}
                                >
                                    Bật / tắt chỉnh sửa
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {newsList.map((news, index) => (
                            <tr key={index}>
                            <td className="border border-black max-w-[50px]" style={{ wordWrap: 'break-word' }}>{news.id}</td>
                            {/* <td className="border border-black px-4 py-2 overflow-hidden whitespace-nowrap max-w-[400px]">{user.password}</td> */}
                            <td className="border border-black px-4 py-2 max-w-[100px]" style={{ wordWrap: 'break-word' }}>{news.title}</td>
                            <td className="border border-black px-4 py-2 max-w-[400px]" style={{ wordWrap: 'break-word' }}>
                                {showMore[index] ? news.content : `${news.content.slice(0, 300)}`}
                                    {news.content.length > 300 && (
                                    <span className="text-blue-500 cursor-pointer" onClick={() => toggleShowMore(index)}>
                                        {showMore[index] ? " Thu gọn" : " ...xem thêm"}
                                    </span>
                                )}
                            </td>
                            <td className="border border-black max-w-[20px]" style={{ wordWrap: 'break-word' }}>{news.date}</td>
                            <td className="px-4 py-2 max-w-[50px]">
                                <button
                                    className={`transition ease-in-out delay-50 bg-white hover:-translate-y-0.5 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 w-14 rounded-lg shadow-lg ${toggleEdit ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
                                    onClick={() => {}}
                                >
                                Edit
                                </button>
                                <button
                                    className={`transition ease-in-out delay-50 bg-white hover:-translate-y-0.5 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 w-14 rounded-lg shadow-lg ${toggleEdit ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
                                    onClick={() => {handleShowDialog(index)}}
                                >
                                Xóa
                                </button>
                                {showDialog[index] && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-0"
                                            onClick={() => handleHideDialog(index)}
                                    >
                                        <div className="bg-white p-4 rounded-lg shadow-lg">
                                            <p className="text-lg text-gray-800 mb-4">Xóa tin {news.title}</p>
                                            <div className="flex justify-end">
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-2"
                                                    onClick={() => {checkAuth(); handleDeleteNews(news.id)}}
                                                >
                                                    Xóa
                                                </button>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg"
                                                    onClick={() => handleHideDialog(index)}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    }
                </>
            );
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
                <p className="">Xem, xóa người dùng</p>
            </button>
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => {checkAuth(); handleMana("product"); handleShowProduct()}}
            >
                <h2 className="text-xl">Quản lý sản phẩm</h2>
                <p className="">Xem, xóa, thêm, chỉnh sửa sản phẩm</p>
            </button>
            <button className="transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 hover:text-white duration-300 bg-white p-4 rounded-lg shadow-lg"
                    onClick={() => {checkAuth(); handleMana("news")}}
            >
                <h2 className="text-xl">Quản lý tin tức</h2>
                <p className="">Xem, xóa, thêm, chỉnh sửa tin tức</p>
            </button>
        </div>
        </>
        );
    }
    const ShortCut = () => {
        return (
            <>
                <div className="nav bg-pink-700 text-white p-4 mb-1">
                    <ul className="flex justify-center gap-40">
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("user"); handleShowUser()} } className={`${isUserMana ? 'underline' : ''} hover:underline`}>Quản lý Người dùng</a></li>
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("product"); handleShowProduct()} } className={`${isProductMana ? 'underline' : ''} hover:underline`}>Quản lý Sản phẩm</a></li>
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("news"); handleShowNews()} } className={`${isNewsMana ? 'underline' : ''} hover:underline`}>Quản lý Tin tức</a></li>
                        <li className="mx-2"><a onClick={() => {checkAuth(); handleMana("return"); } } className={`hover:underline`}>Quay lại</a></li>
                    </ul>
                </div>
                {isUserMana && <UserMana />}
                {isProductMana && <ProductMana />}
                {isNewsMana && <NewsMana />}
            </>
        );
    }
    // checkAuth()
    if(isAuth){
        return (
        <>
        <div className="container mx-auto p-5">
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
