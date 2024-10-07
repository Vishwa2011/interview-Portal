import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { Box, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, FormControl, InputLabel, Select, MenuItem, Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Drawerspage from './Drawerspage';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function QuestionAnswer() {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [subcategories, setSubcategories] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);
    const [editId, setEditId] = React.useState(null);
    const [initialValues, setInitialValues] = React.useState({
        questions: '',
        answer: '',
        subcatagoryID: ''
    });

    const dataToken = localStorage.getItem('token');

    const refreshData = () => {
        axios.get('https://interviewhub-3ro7.onrender.com/questions/', {
            headers: { Authorization: dataToken },
        })
            .then((res) => {
                // console.log("data ==> " + res.data.data);

                setRows(res.data.data)
            })
            .catch(error => console.log(error));
    };



    React.useEffect(() => {
        refreshData();
        NewApi();
        fetchCategories();
    }, [dataToken]);

    const NewApi = async () => {
        axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
            headers: {
                Authorization: dataToken,
            }
        })
            .then((res) => {
                setSubcategories(res.data.data);
            })
            .catch((error) => {
                console.error(error);
            })

    }


    const fetchCategories = () => {
        axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
            headers: { Authorization: dataToken }
        })
            .then((res) => {
                console.log("===AA===");
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.error("mmmmmm", error);
            });
    };

    const handleSubmit = (values) => {
        if (editMode) {
            axios.patch(`https://interviewhub-3ro7.onrender.com/questions/` + editId, values, {
                headers: { Authorization: dataToken },
            })
                .then(() => {
                    refreshData();
                    NewApi()
                    fetchCategories();
                    setOpen(false);
                    setEditMode(false);
                })
                .catch((error) => {
                    console.log(error)

                });
        } else {
            axios.post('https://interviewhub-3ro7.onrender.com/questions/create', values, {
                headers: { Authorization: dataToken },
            })
                .then(() => {
                    refreshData();
                    NewApi()
                    fetchCategories();
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleDelete = (id) => {
        axios.delete(`https://interviewhub-3ro7.onrender.com/questions/` + id, {
            headers: { Authorization: dataToken },
        })
            .then(() => {
                refreshData()
            })
            .catch((error) => {
                console.error(error)
            });
    };

    const handleEdit = (id, row) => {
        setEditId(id);
        setEditMode(true);

        setOpen(true);
    };

    const handleClickOpen = () => {
        setEditMode(false);
        setInitialValues({
            questions: '',
            answer: '',
            subcatagoryID: ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Drawerspage>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{editMode ? 'Edit Q & A' : 'Add Q & A'}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Divider />
                <Formik
                    enableReinitialize
                    onSubmit={handleSubmit}
                    initialValues={initialValues}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <List sx={{ pt: 0 }}>
                                <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '62ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div style={{ marginBottom: '20px', marginTop: '10px', padding: '15px' }}>
                                        <Field
                                            as={TextField}
                                            id="outlined-multiline-flexible"
                                            label="Question"
                                            name='questions'
                                            sx={{ display: 'flex' }}
                                        />
                                        <Field
                                            as={TextField}
                                            id="outlined-multiline-flexible"
                                            label="Answer"
                                            name='answer'
                                        />
                                        <FormControl sx={{ minWidth: '97%', marginLeft: '10px', marginTop: '10px' }}>
                                            <InputLabel>Sub category Name</InputLabel>
                                            <Select
                                                label="Sub category Name"
                                                name="subcatagoryID"
                                                value={values.subcatagoryID}
                                                onChange={(e) => setFieldValue('subcatagoryID', e.target.value)}
                                            >
                                                {subcategories.filter((option) => option.status === 'on').map((option) => (
                                                    <MenuItem key={option._id} value={option._id}>
                                                        {option.subCatagoryname}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Box>
                                <Divider />
                                <Stack
                                    spacing={2}
                                    direction={"row"}
                                    sx={{ margin: '10px', display: 'flex', justifyContent: 'end' }}
                                >
                                    <Button
                                        variant='contained'
                                        type='submit'
                                    >
                                        {editMode ? 'Update' : 'Submit'}
                                    </Button>
                                </Stack>
                            </List>
                        </Form>
                    )}
                </Formik>
            </Dialog>

            <Box sx={{ display: 'flex', margin: '15px' }}>
                <Box
                    sx={{
                        width: '85%',
                        maxWidth: '100%',
                    }}
                >
                    {/* <TextField fullWidth label="Search Category" id="fullWidth" /> */}
                </Box>
                <Button variant="outlined"
                    onClick={handleClickOpen}
                    sx={{
                        background: '#1976d2',
                        color: 'white',
                        margin: '0px 18px',
                        padding: '10px',
                        '&:hover': {
                            background: '#115293',
                            color: 'white',
                        },
                    }}>
                    ADD Q & A
                </Button>
            </Box>

            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell align="left">Questions</StyledTableCell>
                                <StyledTableCell align="left">Answer</StyledTableCell>
                                <StyledTableCell align="center">Sub-Category</StyledTableCell>
                                <StyledTableCell align="center">Category</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                                <StyledTableCell align="center">Update</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.questions}</StyledTableCell>
                                    <StyledTableCell align="left">{row.answer}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Badge color="secondary" badgeContent=" " variant="dot">
                                            {row.subcatagoryID ? row.subcatagoryID.subCatagoryname : 'no'}
                                        </Badge>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Badge color="secondary" badgeContent=" " variant="dot">
                                            {row.subcatagoryID ? row.subcatagoryID.catagoryID.catagoryName : 'No Category'}
                                        </Badge>

                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => handleDelete(row._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <EditIcon onClick={() => handleEdit(row._id, row)} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Drawerspage>
    );
}
