import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button,TablePagination } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import type { Todo } from "../features/todos/types";
import styles from "../styles/Decoration.module.css";
import { useState } from "react";
import Modal from "./Modal";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TodoList{
    todolist: Todo[];
}
export default function TableList({todolist}:TodoList) {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState<string>("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [idSelected, setIdSelected] = useState<number>(0);

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const paginatedTodos = todolist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);    

    const handleOpen = (act:string,id?:number) => {
        setOpen(true);
        setIdSelected(id ?? 0);
        setAction(act);
    };

    return (
    <>
        <TableContainer component={Paper} sx={{margin:"7% 0 0"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>N°</TableCell>
                <TableCell align="left">Task</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.isArray(paginatedTodos)&&paginatedTodos.length>0?
                    paginatedTodos.map((t) => (
                    <TableRow
                        key={`${t.id}-${t.title}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {t.id}
                        </TableCell>
                        <TableCell align="left">{t.title}</TableCell>
                        <TableCell align="left"
                            sx={{
                                display:"flex",
                                justifyContent:"flex-start",
                                alignItems:"center",
                                gap:"10px"
                            }}
                        >
                            <div className={`${styles.circleState} ${t.completed? styles.completed : styles.uncompleted}`}></div>
                            {t.completed?"completed":"uncompleted"}
                        </TableCell>
                        <TableCell align="center" sx={{cursor:"pointer"}} onClick={()=>handleOpen("edit",t.id)}><DriveFileRenameOutlineIcon /></TableCell>
                        <TableCell align="center" sx={{cursor:"pointer"}} onClick={()=>handleOpen("delete",t.id)}><HighlightOffIcon /></TableCell>
                    </TableRow>
                    ))
                :
                    <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            No Hay items
                    </TableRow>
                }
            </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={todolist.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
        <Button
            sx={{
                position:"absolute",
                left:"95%",
                top:"90%"
            }}
            onClick={()=>handleOpen("create")}
        >
            <AddCircleIcon sx={{ fontSize: '3rem' }}/>
        </Button>
        <Modal open={open} setOpen={setOpen} act={action} idSelected={idSelected}/>
    </>
    );
}