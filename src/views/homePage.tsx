import { useFetch } from '../hooks/useFetch';
import React from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel/TableSortLabel';


type FetchUsers = {
    login: {
        uuid: string
    },
    name: {
        first: string,
        last: string
    };
    gender: string;
    email: string;
    nat: string
}

function HomePage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const { data: usersData, isFetching } =
        useFetch<FetchUsers[]>(`?result=${setRowsPerPage(rowsPerPage)}`);
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ minHeight: 500 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Gender</TableCell>
                            
                            <TableCell>
                                
                                Country
                                
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    {isFetching && <>
                        <p>Loading data...</p>
                    </>
                    }
                    {usersData?.map((users) => {

                        return (
                            <TableRow key={users.login.uuid}>
                                <TableCell>{users.name.first} {users.name.last}</TableCell>
                                <TableCell>{users.email}</TableCell>
                                <TableCell>{users.gender}</TableCell>
                                <TableCell>{users.nat}</TableCell>
                            </TableRow>
                        )
                    })
                    }
                </Table>
             {/* <TablePagination
             
             rowsPerPageOptions={[10, 50, 100, { value: -1, label: 'All' }]} 
             
             rowsPerPage={rowsPerPage}
             page={page}
             onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
             />*/}
            </TableContainer> 
        </Paper>
    )
}

export default HomePage
