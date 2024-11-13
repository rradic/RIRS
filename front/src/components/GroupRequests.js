import {useEffect, useState} from "react";
import {approveRequest, declineRequest, fetchGroupsRequests, fetchUsersRequests} from "../services/api";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const approveRequestApi = async (id) => {
    await approveRequest(id)
}

const declineRequestApi = async (id) => {
    await declineRequest(id)
}

const GroupRequests = () => {
    const [usersRequests, setUsersRequests] = useState([]);

    useEffect(() => {
        fetchGroupsRequests().then((response) => {
            setUsersRequests(response)
        });
    }, []);
    console.log(usersRequests)


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Group request</TableCell>
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
                            key={row}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
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
                            <TableCell component="th" scope="row">
                                <Button onClick={approveRequestApi(row._id)}>Approve</Button>
                                <Button onClick={declineRequestApi(row._id)}>Decline</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default GroupRequests;