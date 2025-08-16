
import {Box,Card,CardContent,Typography,Badge} from '@mui/material';
import styles from "../styles/Decoration.module.css";
import type { Todo } from '../features/todos/types';


const CardTodo = ({todo}:Todo) =>{
    return(
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 320,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
            >
            <CardContent>
                <Badge
                    badgeContent="Task" color="primary"
                    sx={{ pointerEvents: 'none',left:"95%"}}
                    >
                </Badge>
                <Badge
                    badgeContent={todo.id} color="primary"
                    sx={{ pointerEvents: 'none',left:"2%"}}
                    >
                </Badge>
                <Typography
                    level="body-sm"
                    aria-describedby="card-description"
                    sx={{ mb: 1 }}
                    >
                        {todo.title}
                </Typography>
                <Box
                    sx={{
                        display:"flex",
                        justifyContent:"flex-start",
                        alignItems:"center",
                        gap:"10px"
                    }}
                >
                    <div className={`${styles.circleState} ${todo.completed? styles.completed : styles.uncompleted}`}></div>
                    <Typography
                        level="body-sm"
                        aria-describedby="card-description"
                        sx={{}}
                        >
                            {todo.completed? "completed" : "uncompleted"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
export default CardTodo;