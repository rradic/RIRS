import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {fetchUsersRequests} from "../services/api";
import {useEffect, useState} from "react";

const approveRequest = (id) => {

}

const UserRequests = () => {

    const [usersRequests, setUsersRequests] = useState([]);

    useEffect(() => {
        fetchUsersRequests().then((response) => {
            setUsersRequests(response)
        });
    }, []);
    console.log(usersRequests)


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Expenses request</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(usersRequests.length)}
                    {usersRequests.length === 0 ? () =>
                        (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    No requests
                                </TableCell>
                            </TableRow>
                        ) : null
                    }
                    {usersRequests.map((row) => (
                        <TableRow
                            key={row}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            {console.log(row)}
                            <TableCell component="th" scope="row">
                                {row.user.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {new Date(row.date).toLocaleDateString('sl-SL')}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.amount}€
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.description}
                            </TableCell>
                            <Button onclick={approveRequest()}></Button>
                            {/*<TableCell align="right">{row.calories}</TableCell>*/}
                            {/*<TableCell align="right">{row.fat}</TableCell>*/}
                            {/*<TableCell align="right">{row.carbs}</TableCell>*/}
                            {/*<TableCell align="right">{row.protein}</TableCell>*/}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserRequests;