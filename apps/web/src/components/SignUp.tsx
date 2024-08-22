import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { signUp } from "shared";
import { useAuthStore } from "../store/authStore";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
	max-width: 300px;
	margin: 0 auto;
`;

const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 16px;
`;

const Button = styled.button`
	padding: 10px;
	background-color: ${(props) => props.theme.colors.primary};
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${(props) => props.theme.colors.secondary};
	}
`;

const SignInButton = styled(Button)`
	background-color: ${(props) => props.theme.colors.secondary};
	margin-top: 10px;

	&:hover {
		background-color: ${(props) => props.theme.colors.primary};
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
	margin-top: 5px;
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
				navigate("/"); // Redirect to home page after successful signup
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
			<Button type="submit">Sign Up</Button>
			<SignInButton type="button" onClick={handleSignInClick}>
				Back to Sign In
			</SignInButton>
		</Form>
	);
};
