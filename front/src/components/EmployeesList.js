import {
    Box,
    Collapse,
    IconButton, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";

import React, {useEffect, useState} from "react";
import {fetchEmployees} from "../services/api";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            {/*<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>*/}
            <TableRow>
                {/*<TableCell>*/}
                {/*    <IconButton*/}
                {/*        aria-label="expand row"*/}
                {/*        size="small"*/}
                {/*        onClick={() => setOpen(!open)}*/}
                {/*    >*/}
                {/*        {open ? <div>zatvori</div>:<div>otvori</div>}*/}
                {/*    </IconButton>*/}
                {/*</TableCell>*/}
                <TableCell component="th" >
                    {row.name}
                </TableCell>
                <TableCell align="right" >/</TableCell>
                {/*<TableCell align="right">{row.group.name}</TableCell>*/}
                <TableCell component="th" align="right">{row.budget}</TableCell>
            </TableRow>
            {/*<TableRow>*/}
            {/*    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>*/}
                    {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                    {/*    <Box sx={{ margin: 1 }}>*/}
                    {/*        <Typography variant="h6" gutterBottom component="div">*/}
                    {/*            History*/}
                    {/*        </Typography>*/}
                    {/*        <Table size="small" aria-label="purchases">*/}
                    {/*            <TableHead>*/}
                    {/*                <TableRow>*/}
                    {/*                    <TableCell>Date</TableCell>*/}
                    {/*                    <TableCell>Customer</TableCell>*/}
                    {/*                    <TableCell align="right">Amount</TableCell>*/}
                    {/*                    <TableCell align="right">Total price ($)</TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            </TableHead>*/}
                    {/*            <TableBody>*/}
                    {/*                {row.history.map((historyRow) => (*/}
                    {/*                    <TableRow key={historyRow.date}>*/}
                    {/*                        <TableCell component="th" scope="row">*/}
                    {/*                            {historyRow.date}*/}
                    {/*                        </TableCell>*/}
                    {/*                        <TableCell>{historyRow.customerId}</TableCell>*/}
                    {/*                        <TableCell align="right">{historyRow.amount}</TableCell>*/}
                    {/*                        <TableCell align="right">*/}
                    {/*                            {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                    {/*                        </TableCell>*/}
                    {/*                    </TableRow>*/}
                    {/*                ))}*/}
                    {/*            </TableBody>*/}
                    {/*        </Table>*/}
                    {/*    </Box>*/}
                    {/*</Collapse>*/}
                {/*</TableCell>*/}
            {/*</TableRow>*/}
        </React.Fragment>
    );
}

export default function EmployeesList() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees().then((response) => {
            console.log(response)
            setEmployees(response)
        });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {/*<TableCell/>*/}
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Group</TableCell>
                        <TableCell align="right">Budget</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((row) => (
                        <Row key={row._id} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}