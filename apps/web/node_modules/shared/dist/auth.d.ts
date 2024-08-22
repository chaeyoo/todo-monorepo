export interface UserProfile {
    id: string;
    email: string;
    nickname: string;
    created_at: string;
}
export declare const signUp: (email: string, password: string, nickname: string) => Promise<UserProfile | null>;
export declare const signIn: (email: string, password: string) => Promise<UserProfile | null>;
export declare const getCurrentUser: () => Promise<UserProfile | null>;
export declare const signOut: () => Promise<void>;
