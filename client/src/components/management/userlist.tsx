import { Fragment, SetStateAction, useRef, useState } from "react";
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
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

const UserListTable = ({userList, setUserList, token, page, setPage}) => {

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isSelected, setSelected] = useState(new Array(userList.length).fill(false));

    const handleSelect = (index : number) => {
        setSelected((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleShowUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users/show.php`, {params:{token:token}});
            setUserList(response.data);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteUser = async (username) => {
        const formData = new URLSearchParams({
            username: username,
            token: token
        });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/users/remove.php`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // console.log(response.data);
            if(response.data === "Deleted user successfully")
            {
                handleShowUser();
                toast.success(`Xóa người dùng ${username} thành công`);
            }
            else{
                toast.error(`Xóa người dùng ${username} không thành công`);
            }

        } catch (error) {
            // console.error('Error:', error);
            toast.error(`Xóa người dùng ${username} không thành công`);
        }
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, userList.length - page * rowsPerPage);

    return (
    <>
        <Table>
        <TableHead>
            <TableRow>
                {/* <TableCell /> */}
                <TableCell width="10%" style={{textAlign:"center"}}>
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Tên người dùng
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Họ và Tên
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Số điện thoại
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Token
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    {/* Actions */}
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : userList
        ).map((user, index: any) => {
            return (
                <>
                    <Fragment key={index}>
                    <TableRow
                        hover
                        key={index}
                    >
                        <TableCell><img className="rounded-full" src={`${user.avatar}`}></img></TableCell>

                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.phone}</TableCell>
                        <TableCell align="center">{user.token}</TableCell>
                        {/* <TableCell align="center">{user.rating}</TableCell> */}
                        <TableCell>
                            <IconButton onClick={() => handleSelect(index)}>
                            <SvgIcon>
                                {isSelected[index] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            </SvgIcon>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    {isSelected[index] &&
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
                                        <img className="rounded-full" src={`${user.avatar}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
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
                                            defaultValue={user.username}
                                            fullWidth
                                            disabled
                                            label="Tên người dùng"
                                            name="username"
                                            key={user.name}
                                        />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            defaultValue={user.name}
                                            fullWidth
                                            disabled
                                            label="Họ và Tên"
                                            name="name"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={3}
                                        >
                                            <TextField
                                            defaultValue={user.phone}
                                            fullWidth
                                            disabled
                                            label="Số điện thoại"
                                            name="phone"
                                            key={user.phone}
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
                            Thông tin nâng cao
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
                                    <TextField
                                    defaultValue={user.password}
                                    fullWidth
                                    disabled
                                    label="Mật khẩu"
                                    name="password"
                                    key={user.password}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={3}
                                >
                                    <TextField
                                    defaultValue={user.token}
                                    fullWidth
                                    disabled
                                    label="Token"
                                    name="token"
                                    key={user.token}
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
                        {/* <Button
                            onClick={() => {handleUpdateUser(user.id)}}
                            type="submit"
                            variant="contained"
                        >
                            Cập nhật
                        </Button> */}
                        <Button
                            color="inherit"
                            onClick={() => {handleSelect(index)}}
                        >
                            Đóng
                        </Button>
                        </Stack>
                        <div>
                        <Button
                            onClick={() => {handleDeleteUser(user.username)}}
                            color="error"
                        >
                            Xóa người dùng
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
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
    );
}

const UserList = ({ userData , token}) => {
    const [addNewUser, setAddNewUser] = useState(false);
    const [userList, setUserList] = useState(userData);

    const [page, setPage] = useState(0);

    const NewUserForm = () => {
        // const [newId, setNewId] = useState('');
        const [newUsername, setNewUsername] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [newName, setNewName] = useState('');
        const [newPhone, setNewPhone] = useState('');

        const handleShowUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users/show.php`, {params:{token:token}});
                setUserList(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const handleAddUser = async () => {
            const formData = new FormData();
            // formData.append('id', newId);
            formData.append('username', newUsername);
            formData.append('name', newName);
            formData.append('password', newPassword);
            formData.append('phone', newPhone);
            formData.append('token', token);

            if(newUsername && newPassword && newName)
            {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/users/add.php`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    // userData = response.data
                    // console.log(response.data)
                    handleShowUser();
                    setAddNewUser(false);
                    toast.success("Thêm người quản trị mới thành công");
                } catch (error) {
                    // console.error('Error:', error);
                    toast.error("Xin hãy nhập đầy đủ thông tin cơ bản");
                }
            }
            else{
                toast.error("Xin hãy nhập đầy đủ thông tin cơ bản");
            }
        }

        const fileInputRef = useRef(null);
        const handleButtonClick = () => {
          fileInputRef.current.click();
        };

        return (
            <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white w-1/3 rounded-lg p-5">
                    <CardContent>
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
                                        md={12}
                                        xs={3}
                                    >
                                        <TextField
                                        fullWidth
                                        onChange={(e) => {setNewUsername(e.target.value)}}
                                        label="Tên tài khoản người quản trị"
                                        name="username"
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
                                        onChange={(e) => {setNewPassword(e.target.value)}}
                                        label="Mật khẩu"
                                        name="passowrd"
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
                                        onChange={(e) => {setNewName(e.target.value)}}
                                        label="Họ và Tên người quản trị"
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
                                        onChange={(e) => {setNewPhone(e.target.value)}}
                                        label="Số điện thoại"
                                        name="phone"
                                        required
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Button
                        onClick={() => {handleAddUser()}}
                        type="submit"
                        variant="contained"
                    >
                        Thêm
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {setAddNewUser(false)}}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
            </>
        );
    }

    const handleSearch = (e) => {
        const term = e ? (e.username ? e.username : e.target.value) : '';

        const filtered = userData.filter(user =>
            user.username.toLowerCase().includes(term.toLowerCase())
        );
        setUserList(filtered)
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
                    onClick={() => {setAddNewUser(true)}}
                    >
                    Thêm người quản trị
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
                        options={userList}
                        getOptionLabel={(option:string) => option.username}
                        onChange={(e, selected) => handleSearch(selected)}
                        sx={{ border: 'none' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Tìm kiếm người dùng"
                                onChange={(e) => handleSearch(e)}
                            />
                        )}
                    />
                </Stack>
                </Card>
                <Card>
                {userList && <UserListTable userList={userList} setUserList={setUserList} token={token} page={page} setPage={setPage}/>}
                </Card>
            </Stack>
            </Container>
        </Box>
        {addNewUser && <NewUserForm />}
    </>
    );
}

export default UserList;
