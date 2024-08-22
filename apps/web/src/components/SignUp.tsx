import React, { useState } from "react";
import { signUp } from "shared";

export const SignUp: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [nickname, setNickname] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			const user = await signUp(email, password, nickname);
			console.log("Signed up:", user);
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				required
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				required
			/>
			<input
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder="Confirm Password"
				required
			/>
			<input
				type="text"
				value={nickname}
				onChange={(e) => setNickname(e.target.value)}
				placeholder="Nickname"
				required
			/>
			<button type="submit">Sign Up</button>
		</form>
	);
};
