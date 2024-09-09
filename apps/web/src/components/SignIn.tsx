import React, { useState } from "react";
import { signIn } from "shared";
import styled from "@emotion/styled";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
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

const SignUpButton = styled(Button)`
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
		<FormContainer>
			<Form onSubmit={handleSubmit}>
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="이메일"
					required
				/>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="비밀번호"
					required
				/>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<Button type="submit">로그인</Button>
				<SignUpButton type="button" onClick={handleSignUpClick}>
					회원가입
				</SignUpButton>
			</Form>
		</FormContainer>
	);
};
