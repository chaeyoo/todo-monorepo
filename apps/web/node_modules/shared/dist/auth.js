"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.getCurrentUser = exports.signIn = exports.signUp = void 0;
const supabase_1 = require("./supabase");
const signUp = (email, password, nickname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. 사용자 등록
        const { data: authData, error: signUpError } = yield supabase_1.supabase.auth.signUp({
            email,
            password,
        });
        if (signUpError)
            throw signUpError;
        if (!authData.user) {
            console.error("User data is missing after sign up");
            return null;
        }
        // 2. 프로필 생성 또는 업데이트
        const { data: profileData, error: profileError } = yield supabase_1.supabase
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
    }
    catch (error) {
        console.error("Error in signUp process:", error);
        throw error;
    }
});
exports.signUp = signUp;
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    if (data.user) {
        const { data: profileData, error: profileError } = yield supabase_1.supabase
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
});
exports.signIn = signIn;
const getCurrentUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { user }, } = yield supabase_1.supabase.auth.getUser();
    if (user) {
        const { data, error } = yield supabase_1.supabase
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
});
exports.getCurrentUser = getCurrentUser;
const signOut = () => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase_1.supabase.auth.signOut();
    if (error)
        throw error;
});
exports.signOut = signOut;
