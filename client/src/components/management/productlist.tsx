import { Fragment, SetStateAction, useRef, useState } from "react";
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputBase,
    LinearProgress,
    MenuItem,
    Stack,
    SvgIcon,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import axios from "axios";
import { toast } from 'react-toastify';

const categoryOptions = [
    {
      label: 'Manga',
      value: 'manga'
    },
    {
      label: 'Light Novel',
      value: 'novel'
    }
]

const ProductListTable = ({productData}) => {
    // console.log(productData);

    const [productList, setProductList] = useState(productData);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isSelected, setSelected] = useState(new Array(productList.length).fill(false));

    const handleProductSelect = (productId : number) => {
        setSelected((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
        setNewImg('');
    };

    const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //handle update
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newType, setNewType] = useState('');
    const [newImg, setNewImg] = useState('');

    const handleShowProduct = async () => {
        try {
            const response = await axios.get(`/api/admin/products/show.php`);
            setProductList(response.data);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpdateProduct = async (productId: any) => {
        const currProduct = productList.find((product: { id: number; }) => product.id === productId);

        const formData = new FormData();
        formData.append('id', currProduct.id);
        formData.append('name', newName ? newName : currProduct.name);
        formData.append('description', newDesc ? newDesc : currProduct.description);
        formData.append('price', newPrice ? newPrice : currProduct.price);
        formData.append('fileToUpload', newImg? newImg : new File([], ""));
        formData.append('image', currProduct.image);
        formData.append('type', newType ? newType : currProduct.type);

        try {
            const response = await axios.post(`/api/admin/products/update.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            handleShowProduct()
            toast.success("Cập nhật sản phẩm thành công");
        } catch (error) {
            // console.error('Error:', error);
            toast.error("Cập nhật sản không thành công");
        }
        setNewName('');
        setNewDesc('');
        setNewPrice('');
        setNewType('');
        setNewImg('');
    }

    const handleDeleteProduct = async (productId) => {
        const formData = new URLSearchParams({
            id: productId
        });
        try {
            const response = await axios.post(`/api/admin/products/remove.php`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // console.log(response.data);
            handleShowProduct();
            toast.success("Xóa sản phẩm thành công");
        } catch (error) {
            // console.error('Error:', error);
            toast.error("Xóa sản phẩm không thành công");
        }
    }

    //handle file input
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, productList.length - page * rowsPerPage);

    return (
    <>
        <Table sx={{ minWidth: 1200 }}>
        <TableHead>
            <TableRow>
                {/* <TableCell /> */}
                <TableCell width="10%" style={{textAlign:"center"}}>
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Tên
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Mô tả
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Giá
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Loại
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Đánh giá
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    {/* Actions */}
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : productList
        ).map((product, index: any) => {
            return (
                <>
                    <Fragment key={product.id}>
                    <TableRow
                        hover
                        key={product.id}
                    >
                        <TableCell><img src={`http://localhost:5173${product.image}`}></img></TableCell>

                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell align="center">{product.price}</TableCell>
                        <TableCell align="center">{product.type}</TableCell>
                        <TableCell align="center">{product.rating}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => handleProductSelect(product.id)}>
                            <SvgIcon>
                                {isSelected[product.id] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            </SvgIcon>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    {isSelected[product.id] &&
                    <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        p: 0,
                        position: 'relative',
                        '&:after': {
                          position: 'absolute',
                          content: '" "',
                          top: 0,
                          left: 0,
                          backgroundColor: 'primary.main',
                          width: 3,
                          height: 'calc(100% + 1px)'
                        }
                      }}
                    >
                    <CardContent>
                        <Grid
                        container
                        spacing={3}
                        >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="h6">
                            Thông tin cơ bản
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid
                            container
                            spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={3}
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <img src={newImg ? URL.createObjectURL(newImg) : `http://localhost:5173${product.image}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                        <InputBase
                                            style={{ display: 'none' }}
                                            inputProps={{ accept: 'image/*' }}
                                            type="file"
                                            name="fileToUpload"
                                            inputRef={fileInputRef}
                                            onChange={(e) => {setNewImg(e.target.files[0])}}
                                        />
                                        <IconButton onClick={() => {handleButtonClick()}}>
                                            <AddPhotoAlternateIcon />
                                        </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={3}
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            defaultValue={product.name}
                                            fullWidth
                                            onChange={(e) => {setNewName(e.target.value)}}
                                            label="Tên sản phẩm"
                                            name="name"
                                        />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            defaultValue={product.price}
                                            fullWidth
                                            onChange={(e) => {setNewPrice(e.target.value)}}
                                            label="Giá"
                                            name="price"
                                            InputProps={{
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    VNĐ
                                                </InputAdornment>
                                                )
                                            }}
                                            type="number"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            defaultValue={product.type}
                                            fullWidth
                                            onChange={(e) => {setNewType(e.target.value)}}
                                            label="Loại"
                                            name="type"
                                            select
                                            >
                                                {categoryOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={3}
                                >
                                    <TextField
                                    defaultValue={product.rating}
                                    fullWidth
                                    disabled
                                    label="Đánh giá"
                                    name="rating"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="h6">
                            Mô tả
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid
                            container
                            // spacing={0}
                            >
                                <Grid
                                    item
                                    md={12}
                                    xl={12}
                                >
                                    <TextField
                                    defaultValue={product.description}
                                    // disabled
                                    fullWidth
                                    onChange={(e) => {setNewDesc(e.target.value)}}
                                    multiline
                                    rows={12}
                                    label="Mô tả"
                                    name="description"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        sx={{ p: 2 }}
                    >
                        <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        >
                        <Button
                            onClick={() => {handleUpdateProduct(product.id)}}
                            type="submit"
                            variant="contained"
                        >
                            Cập nhật
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => {handleProductSelect(product.id)}}
                        >
                            Hủy
                        </Button>
                        </Stack>
                        <div>
                        <Button
                            onClick={() => {handleDeleteProduct(product.id)}}
                            color="error"
                        >
                            Xóa sản phẩm
                        </Button>
                        </div>
                    </Stack>
                    </TableCell>
                    </TableRow>
                    }
                    </Fragment>
                </>
            );
        })}
        {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
            </TableRow>
        )}
        </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25]}
            component="div"
            count={productList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
    );
}

const ProductList = ({ productData }) => {
    const [addNewProduct, setAddNewProduct] = useState(false);
    const [productList, setProductList] = useState(productData);

    const NewProductForm = () => {
        // const [newId, setNewId] = useState('');
        const [newName, setNewName] = useState('');
        const [newDesc, setNewDesc] = useState('');
        const [newPrice, setNewPrice] = useState('');
        const [newType, setNewType] = useState('');
        const [newImg, setNewImg] = useState('');

        const handleShowProduct = async () => {
            try {
                const response = await axios.get(`/api/admin/products/show.php`);
                setProductList(response.data);

            } catch (error) {
                console.error('Error:', error);
            }
        }

        const handleAddProduct = async () => {
            const formData = new FormData();
            // formData.append('id', newId);
            formData.append('name', newName);
            formData.append('description', newDesc);
            formData.append('price', newPrice);
            formData.append('fileToUpload', newImg);
            formData.append('type', newType);

            try {
                const response = await axios.post(`/api/admin/products/add.php`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                // productData = response.data
                // console.log(response.data)
                handleShowProduct();
                setAddNewProduct(false);
                toast.success("Thêm sản phẩm mới thành công");
            } catch (error) {
                // console.error('Error:', error);
                toast.error("Xin hãy nhập đầy đủ thông tin sản phẩm");
            }
            setNewName('');
            setNewDesc('');
            setNewPrice('');
            setNewType('');
            setNewImg('');
        }

        const fileInputRef = useRef(null);
        const handleButtonClick = () => {
          fileInputRef.current.click();
        };

        return (
            <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white w-2/3 rounded-lg p-5">
                    <CardContent>
                        <Grid
                        container
                        spacing={3}
                        >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="h6">
                            Thông tin cơ bản
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid
                            container
                            spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={3}
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <img src={newImg ? URL.createObjectURL(newImg) : ``} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                        <InputBase
                                            style={{ display: 'none' }}
                                            inputProps={{ accept: 'image/*' }}
                                            type="file"
                                            name="fileToUpload"
                                            inputRef={fileInputRef}
                                            onChange={(e) => {setNewImg(e.target.files[0])}}
                                            required
                                        />
                                        <IconButton onClick={() => {handleButtonClick()}}>
                                            <AddPhotoAlternateIcon />
                                        </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={3}
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            fullWidth
                                            onChange={(e) => {setNewName(e.target.value)}}
                                            label="Tên sản phẩm"
                                            name="name"
                                            required
                                        />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            fullWidth
                                            onChange={(e) => {setNewPrice(e.target.value)}}
                                            label="Giá"
                                            name="price"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    VNĐ
                                                </InputAdornment>
                                                )
                                            }}
                                            type="number"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            fullWidth
                                            onChange={(e) => {setNewType(e.target.value)}}
                                            label="Loại"
                                            name="type"
                                            select
                                            required
                                            >
                                                {categoryOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid
                                    item
                                    md={6}
                                    xs={3}
                                >
                                    <TextField
                                    fullWidth
                                    label="Id"
                                    name="id"
                                    onChange={(e) => {setNewId(e.target.value)}}
                                    required
                                    />
                                </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="h6">
                            Mô tả
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid
                            container
                            // spacing={0}
                            >
                                <Grid
                                    item
                                    md={12}
                                    xl={12}
                                >
                                    <TextField
                                    // disabled
                                    fullWidth
                                    onChange={(e) => {setNewDesc(e.target.value)}}
                                    multiline
                                    rows={12}
                                    label="Mô tả"
                                    name="description"
                                    required
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </CardContent>
                    <Button
                        onClick={() => {handleAddProduct()}}
                        type="submit"
                        variant="contained"
                    >
                        Thêm
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {setAddNewProduct(false)}}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
            </>
        );
    }

    return (
    <>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 4
            }}
        >
            <Container maxWidth="xl">
            <Stack spacing={4}>
                <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={3}
                >
                    <Button
                    startIcon={(
                        <SvgIcon>
                        <PlusIcon />
                        </SvgIcon>
                    )}
                    variant="contained"
                    onClick={() => {setAddNewProduct(true)}}
                    >
                    Thêm sản phẩm
                    </Button>
                </Stack>
                </Stack>
                <Card>
                {productList && <ProductListTable productData={productList}/>}
                </Card>
            </Stack>
            </Container>
        </Box>
        {addNewProduct && <NewProductForm />}
    </>
    );
}

export default ProductList;
