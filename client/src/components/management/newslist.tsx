import { Fragment, SetStateAction, useRef, useState } from "react";
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';

import {
    Autocomplete,
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

const NewsListTable = ({newsList, setNewsList}) => {
    // console.log(productData);

    // const [newsList, setNewsList] = useState(newsData);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isSelected, setSelected] = useState(new Array(newsList.length).fill(false));

    const handleSelect = (productId : number) => {
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
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newImg, setNewImg] = useState('');

    const handleShowNews = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/news/show.php`);
            setNewsList(response.data);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpdateNews = async (newsId: any) => {
        const currNews = newsList.find((news: { id: number; }) => news.id === newsId);

        const formData = new FormData();
        formData.append('id', newsId);
        formData.append('title', newTitle ? newTitle : currNews.title);
        formData.append('content', newContent ? newContent : currNews.content);
        formData.append('date', newDate ? newDate : currNews.price);
        formData.append('fileToUpload', newImg? newImg : new File([], ""));
        formData.append('image', currNews.cover);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/news/update.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            handleShowNews()
            toast.success("Cập nhật tin tức thành công");
        } catch (error) {
            // console.error('Error:', error);
            toast.error("Cập nhật tin tức không thành công");
        }
        setNewTitle('');
        setNewContent('');
        setNewDate('');
        setNewImg('');
    }

    const handleDeleteNews = async (newsId) => {
        const formData = new URLSearchParams({
            id: newsId
        });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/news/remove.php`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // console.log(response.data);
            handleShowNews();
            toast.success("Xóa tin tức thành công");
        } catch (error) {
            // console.error('Error:', error);
            toast.error("Xóa tin tức không thành công");
        }
    }

    //handle file input
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, newsList.length - page * rowsPerPage);

    return (
    <>
        <Table>
        <TableHead>
            <TableRow>
                {/* <TableCell /> */}
                <TableCell width="10%" style={{textAlign:"center"}}>
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Tựa đề
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Nội dung
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Năm/tháng/ngày
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    {/* Actions */}
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? newsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : newsList
        ).map((news, index: any) => {
            return (
                <>
                    <Fragment key={news.id}>
                    <TableRow
                        hover
                        key={news.id}
                    >
                        <TableCell><img src={`${news.cover}`}></img></TableCell>

                        <TableCell>{news.title}</TableCell>
                        <TableCell>{news.content}</TableCell>
                        <TableCell align="center">{news.date}</TableCell>
                        {/* <TableCell>{product.type}</TableCell>
                        <TableCell>{product.rating}</TableCell> */}
                        <TableCell>
                            <IconButton onClick={() => handleSelect(news.id)}>
                            <SvgIcon>
                                {isSelected[news.id] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            </SvgIcon>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    {isSelected[news.id] &&
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
                                    md={12}
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
                                        <img src={newImg ? URL.createObjectURL(newImg) : `${news.cover}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
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
                                    md={12}
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
                                            defaultValue={news.title}
                                            fullWidth
                                            onChange={(e) => {setNewTitle(e.target.value)}}
                                            label="Tựa đề"
                                            name="title"
                                        />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            defaultValue={news.date}
                                            fullWidth
                                            onChange={(e) => {setNewTitle(e.target.value)}}
                                            label="Năm - Tháng - Ngày"
                                            name="date"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="h6">
                            Nội dung
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
                                    defaultValue={news.content}
                                    // disabled
                                    fullWidth
                                    onChange={(e) => {setNewContent(e.target.value)}}
                                    multiline
                                    rows={15}
                                    label="Nội dung"
                                    name="content"
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
                            onClick={() => {handleUpdateNews(news.id)}}
                            type="submit"
                            variant="contained"
                        >
                            Cập nhật
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => {handleSelect(news.id)}}
                        >
                            Hủy
                        </Button>
                        </Stack>
                        <div>
                        <Button
                            onClick={() => {handleDeleteNews(news.id)}}
                            color="error"
                        >
                            Xóa tin
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
            count={newsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
    );
}

const NewsList = ({ newsData }) => {
    const [addNewNews, setAddNewNews] = useState(false);
    const [newsList, setNewsList] = useState(newsData);

    const NewProductForm = () => {
        // const [newId, setNewId] = useState('');
        const [newTitle, setNewTitle] = useState('');
        const [newContent, setNewContent] = useState('');
        const [newDate, setNewDate] = useState('');
        const [newImg, setNewImg] = useState(new File([], ""));

        const handleShowNews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/news/show.php`);
                // set(response.data);
                setNewsList(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const handleAddNews = async () => {
            if(newTitle && newContent && newImg){
                const formData = new FormData();
                // formData.append('id', newId);
                formData.append('title', newTitle);
                formData.append('content', newContent);
                formData.append('date', (new Date()).toISOString().split('T')[0]);
                formData.append('fileToUpload', newImg);
                // console.log()
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/news/add.php`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    // productData = response.data
                    handleShowNews();
                    setAddNewNews(false);
                    toast.success("Thêm tin tức mới thành công");
                } catch (error) {
                    // console.error('Error:', error);
                    toast.error("Xin hãy nhập đầy đủ thông tin tin tức");
                }
                setNewTitle('');
                setNewContent('');
                setNewDate('');
                setNewImg(new File([], ""));
            }
            else
            {
                toast.error("Xin hãy nhập đầy đủ thông tin tin tức");
            }
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
                                    md={12}
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
                                        />
                                        <IconButton onClick={() => {handleButtonClick()}}>
                                            <AddPhotoAlternateIcon />
                                        </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    md={12}
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
                                            onChange={(e) => {setNewTitle(e.target.value)}}
                                            label="Tựa đề"
                                            name="title"
                                        />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            fullWidth
                                            disabled
                                            defaultValue={(new Date()).toISOString().split('T')[0]}
                                            onChange={(e) => {setNewTitle(e.target.value)}}
                                            label="Năm - Tháng - Ngày"
                                            name="date"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="h6">
                            Nội dung
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
                                    onChange={(e) => {setNewContent(e.target.value)}}
                                    multiline
                                    rows={15}
                                    label="Nội dung"
                                    name="content"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </CardContent>
                    <Button
                        onClick={() => {handleAddNews()}}
                        type="submit"
                        variant="contained"
                    >
                        Thêm
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {setAddNewNews(false)}}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
            </>
        );
    }

    const handleSearch = (e) => {
        //console.log(e)
        const term = e ? (e.title ? e.title : e.target.value) : '';

        const filtered = newsData.filter(news =>
            news.title.toLowerCase().includes(term.toLowerCase())
        );
        setNewsList(filtered)
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
                    onClick={() => {setAddNewNews(true)}}
                    >
                    Thêm tin tức
                    </Button>
                </Stack>
                </Stack>
                <Card>
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                    sx={{ p: 2 }}
                >
                    <SvgIcon>
                        <SearchMdIcon />
                    </SvgIcon>
                    <Autocomplete
                        fullWidth
                        options={newsData}
                        getOptionLabel={(option:string) => option.title}
                        onChange={(e, selected) => handleSearch(selected)}
                        sx={{ border: 'none' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Tìm kiếm tin tức"
                                onChange={(e) => handleSearch(e)}
                            />
                        )}
                    />
                </Stack>
                </Card>
                <Card>
                {newsList && <NewsListTable newsList={newsList} setNewsList={setNewsList}/>}
                </Card>
            </Stack>
            </Container>
        </Box>
        {addNewNews && <NewProductForm />}
    </>
    );
}

export default NewsList;
