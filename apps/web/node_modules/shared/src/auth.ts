import { supabase } from "./supabase";

export interface UserProfile {
	id: string;
	email: string;
	nickname: string;
	created_at: string;
}

export const signUp = async (
	email: string,
	password: string,
	nickname: string
): Promise<UserProfile | null> => {
	try {
		// 1. 사용자 등록
		const { data: authData, error: signUpError } = await supabase.auth.signUp({
			email,
			password,
		});

		if (signUpError) throw signUpError;

		if (!authData.user) {
			console.error("User data is missing after sign up");
			return null;
		}

		// 2. 프로필 생성 또는 업데이트
		const { data: profileData, error: profileError } = await supabase
			.from("profiles")
			.upsert({
				id: authData.user.id,
				email: authData.user.email,
				nickname: nickname,
				created_at: new Date().toISOString(),
			})
			.select()
			.single();

		if (profileError) {
			console.error("Error creating/updating profile:", profileError);
			throw profileError;
		}

		console.log("Profile data:", profileData); // 디버깅용

		return profileData;
	} catch (error) {
		console.error("Error in signUp process:", error);
		throw error;
	}
};

export const signIn = async (
	email: string,
	password: string
): Promise<UserProfile | null> => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw error;
	}

	if (data.user) {
		const { data: profileData, error: profileError } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", data.user.id)
			.single();

		if (profileError) {
			throw profileError;
		}

		return profileData;
	}

	return null;
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.single();

		if (error) {
			throw error;
		}

		return data;
	}

	return null;
};

export const signOut = async (): Promise<void> => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
};
