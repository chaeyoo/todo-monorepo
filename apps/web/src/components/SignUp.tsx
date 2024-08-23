import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { signUp } from "shared";
import { useAuthStore } from "../store/authStore";
import { colors, commonStyles } from "shared/src/styles/todoStyles";

const FormContainer = styled.div`
	${commonStyles.container}
	max-width: 400px;
	margin: 40px auto;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Input = styled.input`
	${commonStyles.input}
`;

const Button = styled.button`
	${commonStyles.button}
`;

const SignInButton = styled(Button)`\
	color: ${colors.primary}
	background-color: ${colors.secondary};
	&:hover {
		background-color: ${colors.accent};
	}
`;

const ErrorMessage = styled.p`
	color: #d32f2f;
	font-size: 0.9rem;
	text-align: center;
`;

export const SignUp: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const setUser = useAuthStore((state) => state.setUser);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const user = await signUp(email, password, nickname);
			if (user) {
				console.log("Signed up:", user);
				setUser(user);
				navigate("/");
			} else {
				setError("Signup failed. Please try again.");
			}
		} catch (error) {
			console.error("Error signing up:", error);
			setError(
				error instanceof Error ? error.message : "An unknown error occurred"
			);
		}
	};

	const handleSignInClick = () => {
		navigate("/signin");
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit}>
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<Input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Password"
					required
				/>
				<Input
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					placeholder="Nickname"
					required
				/>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<Button type="submit">가입하기</Button>
				<SignInButton type="button" onClick={handleSignInClick}>
					로그인하러 가기
				</SignInButton>
			</Form>
		</FormContainer>
	);
};
