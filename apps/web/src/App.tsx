import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { theme } from "./styles/theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserInfo } from "./components/UserInfo";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { useAuthStore } from "./store/authStore";
import { colors, commonStyles, animations } from "shared/src/styles/todoStyles";

const AppWrapper = styled.div`
  ${commonStyles.container}
  max-width: 800px;
  margin: 40px auto;
  animation: ${animations.fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  color: ${colors.primary};
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: ${colors.primary};
  animation: ${animations.pulse} 1.5s infinite;
`;

const LogoutButton = styled.button`
  ${commonStyles.button}
  animation: ${animations.slideIn} 0.5s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.primary};
`;

const ErrorMessage = styled.div`
  color: ${colors.primary};
  text-align: center;
  font-size: 1rem;
  margin-top: 20px;
  padding: 10px;
  background-color: ${colors.background};
  border: 1px solid ${colors.primary};
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
        <LoadingWrapper>로딩 중...</LoadingWrapper>
      </ThemeProvider>
    );
  }

  if (error) {
    return <ErrorMessage>오류: {error}</ErrorMessage>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppWrapper>
          <Header>
            <Title>할 일 목록</Title>
            {user && <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>}
          </Header>
          <Routes>
            <Route
              path="/signin"
              element={user ? <Navigate to="/" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/"
              element={
                user ? (
                  <>
                    <UserInfo user={user} />
                    <TodoForm />
                    <TodoList />
                  </>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;