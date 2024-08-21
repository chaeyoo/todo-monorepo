import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { theme } from "./styles/theme";
import { getCurrentUser, UserProfile } from "shared";
import { useEffect, useState } from "react";
import { UserInfo } from "./components/UserInfo";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";

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
	const [user, setUser] = useState<UserProfile | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await getCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<Title>Todo App</Title>
				<UserInfo user={user} />
				{user ? (
					<>
						<TodoForm />
						<TodoList />
					</>
				) : (
					<>
						<SignUp />
						<SignIn />
					</>
				)}
			</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
