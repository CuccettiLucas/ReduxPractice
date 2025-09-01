import { Box,TextField,Checkbox,FormGroup,FormControlLabel,Typography,FormControl,Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { toggleTodoStatus } from "../features/todos/todosSlice";
import { useEffect, useState } from "react";
import type { Todo } from "../features/todos/types";


interface EditProp{
    id:number | null;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTask = ({id,setOpen}:EditProp) =>{

    const {list, loading} = useSelector((state:RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();
    const [task, setTask] = useState<Todo>({
        id:0,
        title:"",
        completed:false
    });
    

    useEffect(() => {
        const selectedTask = list.find(t => t.id === id);
        if (selectedTask) {
            setTask((prev)=>({
                ...prev,
                id: selectedTask.id,
                title:selectedTask.title,
                completed:selectedTask.completed
            }));
        }
    }, [list]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;

        setTask((prev)=>({
            ...prev,
            [name]: type === "checkbox" ? checked:value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("Todo Edit",task);
        dispatch(toggleTodoStatus(task));
        setOpen(false);
    }

    if(loading){
        return <h1>Cargando</h1>
    }

    return(
        <Box>
            {
                Array.isArray(list)&&list.length>0?
                <>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h5" gutterBottom>
                        Editar tarea N°{task.id}
                    </Typography>
                    <FormControl>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            value={task.title}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    name="completed"
                                    checked={task.completed}
                                    onChange={handleChange}
                                />
                            } 
                            label={task.completed?"completed":"uncompleted"}
                        />
                    </FormGroup>
                    <Button type="submit" variant="contained" sx={{ m: 1, position:"relative", left:"44%",top:"20px"}}>
                        Enviar
                    </Button>
                </Box>
                </>
                :
                <div>error</div>
            }
            
        </Box>
    );
}

export default EditTask;