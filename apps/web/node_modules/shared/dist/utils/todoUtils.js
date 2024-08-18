"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = exports.generateId = void 0;
const generateId = () => Math.random().toString(36).substring(2, 9);
exports.generateId = generateId;
const createTodo = (title) => ({
    id: (0, exports.generateId)(),
    title,
    completed: false,
});
exports.createTodo = createTodo;
