import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { Todo } from "./types";
import { getTodos,addTodo,deleteTodo,toggleTodo,getTask } from "./todosAPI";
import type { RootState } from "../../app/store";

interface TodosState{
    list:Todo[];
    selectedTodo: any | null;
    loading:boolean;
    error:string|null;
}

//Estado inicial
const initialState:TodosState = {
    list:[],
    loading:false,
    error:null,
    selectedTodo:null,
}

//Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () =>{
    return await getTodos();
});

export const createTodo = createAsyncThunk("todos/createTodo", async (todo:Todo)=>{
    return await addTodo(todo);
})

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id:number) =>{
    return await deleteTodo(id);
});

export const toggleTodoStatus = createAsyncThunk('todos/toggleTodoStatus', async (todo:Todo) =>{
    return await toggleTodo(todo);
});

export const getTodo = createAsyncThunk('todos/getTodo', async (id:number) =>{
    return await getTask(id);
});


//Cases
const todosSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchTodos.fulfilled, (state,action) =>{
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchTodos.rejected, (state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Error al cargar."
        })
        // Create
        .addCase(createTodo.fulfilled, (state,action) =>{
            state.list.push(action.payload);
        })
        // Delete
        .addCase(removeTodo.fulfilled,(state,action)=>{
            state.list = state.list.filter(todo => todo.id !== action.payload);
        })
        // Toogle / cambio de estado
        .addCase(toggleTodoStatus.fulfilled,(state,action) =>{
            const index = state.list.findIndex(todo => todo.id === action.payload.id);
            if(index !== -1){
                state.list[index] = action.payload;
                //state.selectedTodo = action.payload;
            }
        })
        // Obtener 1 Tak
        .addCase(getTodo.fulfilled,(state,action)=>{
            const index = state.list.findIndex(todo => todo.id === action.payload.id);
            if(index !== -1){
                state.list[index] = action.payload;
                state.selectedTodo = action.payload;
            } else {
                state.list.push(action.payload);
                state.selectedTodo = null;
            }
            state.loading = false;
        });
    }
})

export default todosSlice.reducer;

export const selectTodos = (state: RootState) => state.todos;