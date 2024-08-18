import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { theme } from "./styles/theme";

const AppWrapper = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
`;

const Title = styled.h1`
	color: ${(props) => props.theme.colors.primary};
	text-align: center;
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<Title>Todo App</Title>
				<TodoForm />
				<TodoList />
			</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
