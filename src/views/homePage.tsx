import { useFetch } from '../hooks/useFetch';
import "./HomePage.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel/TableSortLabel';
import TableFooter from '@mui/material/TableFooter';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';


type FetchUsers = {
    gender: string;
    email: string;
    nat: string
    login: {
        uuid: string
    },
    name: {
        first: string,
        last: string
    };
}

function HomePage() {
    const pages = [10, 20, 30, 40, 50, 100, 1000]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [country, setCountry] = useState('');
    const [filterUser, setFilterUser] = useState<FetchUsers[] | null>(null)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const recordsAfterPagingAndSorting = () => {
        return filterUser?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const headerCells = [
        { id: 'fullname', label: 'Name' },
        { id: 'email', label: 'E-mail' },
        { id: 'gender', label: 'Gender' },
        { id: 'nat', label: 'Country' }
    ]

    const { data: usersData, isFetching } =
        useFetch<FetchUsers[]>(`?results=${rowsPerPage}&nat=${country}`);

    useEffect(() => {
        if (usersData) {
            setFilterUser(usersData)
        }
    }, [usersData])

    const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value);
        setCountry(e.target.value)
        if (Array.isArray(filterUser) && filterUser?.length > 0) {
            const newArray = filterUser?.filter(user => {
                return user.nat === country
            })
            console.log(newArray);
            if (newArray?.length > 0) {
                setFilterUser(newArray)
            }
        }
    }
    const filterByCountry = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setCountry(e.target.value)
    }

    return (
        <Paper sx={{ width: '100%' }} className="HomePage">
                <TextField
                    onChange={e => setCountry(e.target.value.toUpperCase())}
                    id="search-field"
                    label="Search by Country"
                    variant="filled"
                    value={country}
                />          

            <TableContainer sx={{ minHeight: 500 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {isFetching && <TableCell><p>Loading data...</p></TableCell>}
                            {headerCells.map(headCell => (
                                <TableCell key={headCell.id}>
                                    {headCell.label}
                                </TableCell>
                            ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterUser?.map((users) => {
                            if(country) {
                                if(country === users.nat) {
                                    return (
                                        <TableRow key={users.login.uuid}>
                                            <TableCell>{users.name.first} {users.name.last}</TableCell>
                                            <TableCell>{users.email}</TableCell>
                                            <TableCell>{users.gender}</TableCell>
                                            <TableCell>{users.nat}</TableCell>
                                        </TableRow>
                                    )
                                }
                            } else {
                                return (
                                    <TableRow key={users.login.uuid}>
                                        <TableCell>{users.name.first} {users.name.last}</TableCell>
                                        <TableCell>{users.email}</TableCell>
                                        <TableCell>{users.gender}</TableCell>
                                        <TableCell>{users.nat}</TableCell>
                                    </TableRow>
                                )
                            }
                        })
                        }
                    </TableBody>
                    {/* <TableFooter>
                        <TablePagination
                            count={usersData?.length}
                            rowsPerPageOptions={pages}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter> */}
                </Table>
            </TableContainer>

        </Paper >
    )
}

export default HomePage
