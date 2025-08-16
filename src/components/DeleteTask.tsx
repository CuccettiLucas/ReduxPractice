import { Box,Typography,Badge,Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState } from "../app/store";
import { removeTodo } from "../features/todos/todosSlice";
import type React from "react";

interface deleteProps{
    id:number;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteTask = ({id,setOpen}:deleteProps) =>{
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () =>{
        dispatch(removeTodo(id));
        setOpen(false);
    }

    return(
        <Box>
            <Badge
                badgeContent="Task" color="primary"
                sx={{ pointerEvents: 'none',left:"95%"}}
                >
            </Badge>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {`Estas seguro que deseas eliminar la tarea ${id}?`}
            </Typography>
            <Button 
                variant="contained" 
                sx={{left:"75%",top:"10px"}}
                onClick={handleDelete}
            >
                Eliminar
            </Button>
        </Box>
    );
}

export default DeleteTask;