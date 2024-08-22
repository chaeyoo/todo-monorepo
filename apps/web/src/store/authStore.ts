import { getCurrentUser, supabase, UserProfile } from "shared";
import create from "zustand";

interface AuthState {
	user: UserProfile | null;
	loading: boolean;
	error: string | null;
}

interface AuthActions {
	setUser: (user: UserProfile | null) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	checkUser: () => Promise<void>;
	signOut: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	loading: true,
	error: null,
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error }),
	checkUser: async () => {
		set({ loading: true, error: null });
		try {
			const {
				data: { session },
				error: sessionError,
			} = await supabase.auth.getSession();

			if (sessionError) {
				throw sessionError;
			}

			if (session) {
				try {
					const currentUser = await getCurrentUser();
					set({ user: currentUser, loading: false });
				} catch (userError) {
					console.error("Error fetching current user:", userError);
					set({
						user: null,
						loading: false,
						error:
							userError instanceof Error
								? userError.message
								: "Failed to fetch user data",
					});
				}
			} else {
				set({ user: null, loading: false });
			}
		} catch (error) {
			console.error("Error checking session:", error);
			set({
				user: null,
				loading: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to check user session",
			});
		}
	},
	signOut: async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			}
			set({ user: null, error: null });
		} catch (error) {
			console.error("Error signing out:", error);
			set({
				error: error instanceof Error ? error.message : "Failed to sign out",
			});
		}
	},
}));

useAuthStore.getState().checkUser();

supabase.auth.onAuthStateChange((event, session) => {
	if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
		useAuthStore.getState().checkUser();
	} else if (event === "SIGNED_OUT") {
		useAuthStore.getState().setUser(null);
	}
});
