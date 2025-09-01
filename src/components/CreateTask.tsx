import React,{useState} from "react";
import { Box,TextField,Typography,FormControl,Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store.ts";
import type { Todo } from "../features/todos/types";
import { createTodo } from "../features/todos/todosSlice";

interface CreateTask{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTask = ({setOpen}:CreateTask) =>{
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todos.list);
    const [task, setTask] = useState<Todo>({
        id:0,
        title:"",
        completed:false
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        console.log("createTask", todos)
        const lastId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

        const newTask: Todo = {
            id: lastId + 1,
            title: task.title,
            completed: false
        };

        dispatch(createTodo(newTask));
        setOpen(false);
    }

    return(
        <Box>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h5" gutterBottom>
                    Crear Nueva tarea
                </Typography>
                <FormControl>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        value={task.title}
                        onChange={e => setTask({ ...task, title: e.target.value })}
                    />
                </FormControl>
                <Button type="submit" variant="contained" sx={{ m: 1, position:"relative", left:"44%",top:"20px"}}>
                    Crear
                </Button>
            </Box>
        </Box>
    )
}

export default CreateTask;