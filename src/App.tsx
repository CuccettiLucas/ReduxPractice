import TodoList from "./components/TodoList"
import { Container} from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import theme from "./theme/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <TodoList />
      </Container>
    </ThemeProvider>
  )
}

export default App
