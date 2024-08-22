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
import { useAuthStore } from "./store/authStore";

const AppWrapper = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
`;

const Title = styled.h1`
	color: ${(props) => props.theme.colors.primary};
	text-align: center;
`;

const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 1.2rem;
	color: ${(props) => props.theme.colors.primary};
`;

const LogoutButton = styled.button`
	background-color: ${(props) => props.theme.colors.secondary};
	color: white;
	border: none;
	padding: 10px 15px;
	border-radius: 5px;
	cursor: pointer;
	margin-top: 10px;

	&:hover {
		background-color: ${(props) => props.theme.colors.primary};
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

function App() {
	const { user, loading, error, checkUser, signOut } = useAuthStore();

	useEffect(() => {
		checkUser();
	}, [checkUser]);

	const handleLogout = async () => {
		await signOut();
	};

	if (loading) {
		return (
			<ThemeProvider theme={theme}>
				<LoadingWrapper>Loading...</LoadingWrapper>
			</ThemeProvider>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<Header>
					<Title>Todo App</Title>
					{user && <LogoutButton onClick={handleLogout}>Logout</LogoutButton>}
				</Header>
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
