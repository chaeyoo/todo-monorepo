"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animations = exports.commonStyles = exports.colors = void 0;
const react_1 = require("@emotion/react");
// 색상 테마
exports.colors = {
    primary: '#000000',
    secondary: '#FFFFFF',
    background: '#F5F5F5',
    text: '#333333',
    accent: '#808080',
};
// 공통 스타일
exports.commonStyles = {
    container: `
    background-color: ${exports.colors.secondary};
    border-radius: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  `,
    input: `
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${exports.colors.primary};
    border-radius: 0;
    font-size: 16px;
    transition: all 0.3s ease;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${exports.colors.primary};
    }
  `,
    button: `
    background-color: ${exports.colors.primary};
    color: ${exports.colors.secondary};
    border: none;
    padding: 10px 15px;
    border-radius: 0;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    &:hover {
      background-color: ${exports.colors.accent};
    }
  `,
};
// 애니메이션
exports.animations = {
    fadeIn: (0, react_1.keyframes) `
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `,
    slideIn: (0, react_1.keyframes) `
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  `,
    pulse: (0, react_1.keyframes) `
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `,
};
