import React, { useState } from "react";
import { signIn } from "shared";

export const SignIn: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const user = await signIn(email, password);
			console.log("Signed in:", user);
		} catch (error) {
			console.error("Error signing in:", error);
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
			<button type="submit">Sign In</button>
		</form>
	);
};
