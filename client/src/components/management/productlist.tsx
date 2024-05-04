import { Fragment, useCallback, useState } from "react";
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
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
    Typography
} from '@mui/material';

const ProductListTable = ({ productList }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isSelected, setSelected] = useState(false);

    const handleProductToggle = useCallback((productId) => {
        setSelected((prevProductId) => {
          if (prevProductId === productId) {
            return null;
          }

          return productId;
        });
      }, []);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
        ).map((product, index) => {
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
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.type}</TableCell>
                        <TableCell>{product.rating}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => handleProductToggle(product.id)}>
                            <SvgIcon>
                                {isSelected ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            </SvgIcon>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    {isSelected &&
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
                                    xs={12}
                                >
                                    <TextField
                                    defaultValue={product.name}
                                    fullWidth
                                    label="Product name"
                                    name="name"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                    defaultValue={product.type}
                                    fullWidth
                                    label="Loại"
                                    select
                                    >
                                        {categoryOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                        {/* <div>{product.type}</div> */}
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                    defaultValue={product.price}
                                    fullWidth
                                    label="Giá"
                                    name="price"
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                        )
                                    }}
                                    type="number"
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
                                    multiline
                                    rows={8}
                                    label="Mô tả"
                                    name="Mô tả"
                                    />
                                </Grid>
                                {/* <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                    }}
                                >
                                </Grid> */}
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
                            onClick={() => {}}
                            type="submit"
                            variant="contained"
                        >
                            Update
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => {handleProductToggle(product.id)}}
                        >
                            Cancel
                        </Button>
                        </Stack>
                        <div>
                        <Button
                            onClick={() => {}}
                            color="error"
                        >
                            Delete product
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

const ProductList = ({ productList }) => {
    return (
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
                    >
                    Thêm sản phẩm
                    </Button>
                </Stack>
                </Stack>
                <Card>
                {productList && <ProductListTable productList={productList}/>}
                </Card>
            </Stack>
            </Container>
        </Box>
    );
}

export default ProductList;
