import {useEffect, useState} from "react";
import {fetchGroupsRequests, fetchRecentRequests} from "../services/api";
import {Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const RecentRequests = () => {
    const [usersRequests, setUsersRequests] = useState([]);

    useEffect(() => {
        fetchRecentRequests().then((response) => {
            setUsersRequests(response)
        });
    }, []);
    console.log(usersRequests)


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Recent request</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
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
                            key={row._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <Avatar>{row.user.name.charAt(0)}</Avatar> {row.user.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.status}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.amount}€
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {new Date(row.date).toLocaleDateString('sl-SL')}
                            </TableCell>
                            {/*<Button onclick={approveRequest()}></Button>*/}
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

export default RecentRequests;