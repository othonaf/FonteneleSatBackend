"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const login_1 = __importDefault(require("./login"));
const criarUsuario_1 = __importDefault(require("./criarUsuario"));
// Rota para o Endpoint de Login:
app_1.default.use('/api', login_1.default);
// Rota para o Endpoint de criar Usuário.
app_1.default.use('/api', criarUsuario_1.default);
