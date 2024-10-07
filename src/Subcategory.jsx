import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box, Button, Dialog, DialogTitle, Divider, FormControl, FormControlLabel, IconButton,
    InputLabel, List, MenuItem, Paper, Select, Stack, Switch, Table, TableBody,
    TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Field, Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Drawerspage from './Drawerspage';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

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

export default function Subcatagory() {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);
    const [editId, setEditId] = React.useState(null);
    const initialValues = { subCatagoryname: '', catagoryID: '' };
    const [search, setSearch] = React.useState('');

    const dataToken = localStorage.getItem('token');



    const refreshData = () => {
        axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
            headers: { Authorization: dataToken },
        })
            .then(res => {
                console.log('Subcategories data:', res.data);
                setRows(res.data.data);
            })
            .catch(error => console.log(error));
    };



    React.useEffect(() => {
        refreshData();
        axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
            headers: { Authorization: dataToken },
        })
            .then(res => setCategories(res.data.data || []))
            .catch(error => console.log(error));
    }, []);
    React.useEffect(() => {
        searchsubCategories();
    }, [search]);

    const searchsubCategories = async () => {
        try {
            const response = await axios.get(`https://interviewhub-3ro7.onrender.com/subcatagory/?search=${search}`, {
                headers: { Authorization: dataToken },
            });
            console.log('Search response:', response.data);
            setRows(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        console.log('Search query:', event.target.value);
    };
    const handleSubmit = (values) => {
        if (editMode) {
            axios.patch(`https://interviewhub-3ro7.onrender.com/subcatagory/` + editId, values, {
                headers: { Authorization: dataToken },
            })
                .then(() => {
                    refreshData();
                    setOpen(false);
                    setEditMode(false);
                })
                .catch(error => console.log(error));
        } else {
            axios.post('https://interviewhub-3ro7.onrender.com/subcatagory/create', values, {
                headers: { Authorization: dataToken },
            })
                .then(() => {
                    refreshData();
                    setOpen(false);
                })
                .catch(error => console.log(error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`https://interviewhub-3ro7.onrender.com/subcatagory/` + id, {
            headers: { Authorization: dataToken },
        })
            .then(() => refreshData())
            .catch(error => console.error(error));
    };

    const handleEdit = (id) => {
        const selectedRecord = rows.find(record => record._id === id);
        if (selectedRecord) {
            setEditId(id);
            setEditMode(true);
            setOpen(true);
        }
    };

    const handleStatusChange = async (e, record) => {
        try {
            await axios.patch(`https://interviewhub-3ro7.onrender.com/subcatagory/` + record._id, { 'status': e.target.checked ? 'on' : 'off' },
                {
                    headers:
                    {
                        Authorization: dataToken

                    }
                }
            )
            refreshData()
        }
        catch (error) {
            console.log(error);

        }

    }


    return (
        <Drawerspage>
            <Box sx={{ display: 'flex', margin: '15px' }}>
                <TextField
                    fullWidth
                    label="Search Category"
                    value={search}
                    onChange={handleSearchChange} />
                <Button
                    variant="outlined"
                    onClick={() => {
                        setEditMode(false);
                        setOpen(true);
                    }}
                    sx={{
                        background: '#1976d2',
                        color: 'white',
                        margin: '0px 10px',
                        padding: '10px',
                        '&:hover': { background: '#115293', color: 'white' },
                    }}
                >
                    ADD SUB CATEGORY
                </Button>
            </Box>

            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>{editMode ? 'Edit Sub Category' : 'Add Sub Category'}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
                <Divider />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <List sx={{ pt: 0 }}>
                                <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '32ch' },
                                        marginBottom: '20px', marginTop: '10px', padding: '15px'
                                    }}
                                >
                                    <Field
                                        as={TextField}
                                        label="Sub Category"
                                        name="subCatagoryname"
                                        sx={{ display: 'flex' }}
                                    />
                                    <FormControl fullWidth sx={{ minWidth: 120 }}>
                                        <InputLabel>Category Name</InputLabel>
                                        <Select

                                            label="Category Name"
                                            name="catagoryID"
                                            value={values.catagoryID}
                                            onChange={(e) => setFieldValue('catagoryID', e.target.value)}
                                        >
                                            {categories.filter((option) => option.status === 'on').map((option) => (
                                                <MenuItem key={option._id} value={option._id}>
                                                    {option.catagoryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Divider />
                                <Stack
                                    spacing={2}
                                    direction={"row"}
                                    sx={{ margin: '10px', display: 'flex', justifyContent: 'end' }}
                                >
                                    <Button variant="contained" type="submit">SUBMIT</Button>
                                </Stack>
                            </List>
                        </Form>
                    )}
                </Formik>
            </Dialog>

            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell align="left">Sub-Catagory Name</StyledTableCell>
                                <StyledTableCell align="left">Category Name</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                                <StyledTableCell align="center">Update</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="left">{row.subCatagoryname}</StyledTableCell>
                                    <StyledTableCell align="left">{row.catagoryID ? row.catagoryID.catagoryName : 'no'}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <FormControlLabel control={<Switch checked={row.status == 'on'} onChange={(e) => handleStatusChange(e, row)} />} />
                                        {/* <Switch {...label} checked={row.status} /> */}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => handleDelete(row._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton aria-label="edit" onClick={() => handleEdit(row._id, row)}>
                                            <EditIcon />
                                        </IconButton>
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