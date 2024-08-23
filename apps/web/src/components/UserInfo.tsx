import React from "react";
import styled from "@emotion/styled";
import { UserProfile } from "shared";
import { colors, commonStyles } from "shared/src/styles/todoStyles";

interface Props {
	user: UserProfile | null;
}

const UserInfoContainer = styled.div`
	${commonStyles.container}
	margin-bottom: 20px;
	padding: 15px;
	background-color: ${colors.secondary}20;
	border-left: 4px solid ${colors.primary};
`;

const WelcomeMessage = styled.div`
	font-size: 1.1rem;
	color: ${colors.text};
`;

const SignInMessage = styled.div`
	font-size: 1rem;
	color: ${colors.accent};
	text-align: center;
	padding: 10px;
	background-color: ${colors.secondary}20;
	border-radius: 4px;
`;

const Nickname = styled.span`
	font-weight: bold;
	color: ${colors.primary};
`;

const MotivationalMessage = styled.div`
	font-size: 0.9rem;
	color: ${colors.secondary};
	margin-top: 8px;
	font-style: italic;
`;

export const UserInfo: React.FC<Props> = ({ user }) => {
	if (!user) {
		return <SignInMessage>로그인하고 할 일 정리 시작해볼까요?</SignInMessage>;
	}

	const motivationalMessages = [
		"오늘도 파이팅!",
		"조금씩 해내다 보면 어느새 다 했더라고요.",
		"할 수 있어요, 우리!",
		"오늘 하루도 잘 해낼 거예요.",
		"작은 진전도 칭찬해요!",
	];

	const randomMessage =
		motivationalMessages[
			Math.floor(Math.random() * motivationalMessages.length)
		];

	return (
		<UserInfoContainer>
			<WelcomeMessage>
				<Nickname>{user.nickname}</Nickname>님, 반가워요!
			</WelcomeMessage>
			<MotivationalMessage>{randomMessage}</MotivationalMessage>
		</UserInfoContainer>
	);
};
