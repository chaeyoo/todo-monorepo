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
exports.fetchTodos = exports.createTodo = exports.generateId = void 0;
const supabase_1 = require("../supabase");
const generateId = () => Math.random().toString(36).substring(2, 9);
exports.generateId = generateId;
const createTodo = (title, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from("todos")
        .insert({ title, created_by: userId })
        .single();
    if (error) {
        console.error("Error creating todo:", error);
        return null;
    }
    return data;
});
exports.createTodo = createTodo;
const fetchTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from("todos")
        .select("*")
        .eq("created_by", userId)
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
    return data || [];
});
exports.fetchTodos = fetchTodos;
