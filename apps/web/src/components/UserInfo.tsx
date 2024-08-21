import React from "react";
import { UserProfile } from "shared";

interface Props {
	user: UserProfile | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
	if (!user) {
		return <div>Please sign in to use the Todo app</div>;
	}

	return <div>Welcome, {user.nickname}!</div>;
};
