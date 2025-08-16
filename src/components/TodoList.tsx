import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchTodos } from "../features/todos/todosSlice";
import { useEffect } from "react";
import Swipper from "./Swipper";
import TableList from "./TableList";

const TodoList = () =>{
    const {list,loading,error} = useSelector((state:RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() =>{
        dispatch(fetchTodos());
    },[dispatch]);

    if(loading) return <h1>Cargando</h1>;
    if(error) return <h2>error</h2>
    //console.log(list);
    return(
        <Box component="section" sx={{padding:"20px 10px"}}>
            <Typography variant="h2" sx={{fontSize:"1.2em"}} color="primary">Lista de tareas</Typography>
            <Swipper todolist={list} />
            <TableList todolist={list} />
        </Box>
    )
}

export default TodoList;