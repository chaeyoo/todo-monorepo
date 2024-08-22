import React, { useState } from "react";
import { signIn } from "shared";
import styled from "@emotion/styled";

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

const Button = styled.button`
	padding: 10px;
	background-color: ${(props) => props.theme.colors.primary};
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.colors.secondary};
	}
`;

const SignUpButton = styled(Button)`
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
	text-align: center;
`;

export const SignIn: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const setUser = useAuthStore((state) => state.setUser);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const user = await signIn(email, password);
			console.log("Signed in:", user);
			setUser(user);
			navigate("/");
		} catch (error) {
			console.error("Error signing in:", error);
			setError("Invalid email or password. Please try again.");
		}
	};

	const handleSignUpClick = () => {
		navigate("/signup");
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
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Button type="submit">Sign In</Button>
			<SignUpButton type="button" onClick={handleSignUpClick}>
				Sign Up
			</SignUpButton>
		</Form>
	);
};
