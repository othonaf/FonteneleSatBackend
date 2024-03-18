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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/criarLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, senha, tipo } = req.body;
    try {
        // Verifica se o usuário já existe no banco de dados
        const userExistsResult = yield (0, connection_1.default)('usuarios').where({ nome: nome });
        if (userExistsResult.length > 0) {
            return res.status(409).json({ message: 'Usuário já existe' });
        }
        // Gere um salt aleatório
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        // Crie o hash da senha com o salt
        const hashedPassword = yield bcrypt_1.default.hash(senha, salt);
        // Insira o usuário no banco de dados com a senha com hash e sal
        yield connection_1.default.raw(`
            INSERT INTO usuarios (nome, senha, tipo)
            VALUES (
                '${nome}',
                '${hashedPassword}',
                '${tipo}'
            )
      `);
        res.json({ message: 'Usuário registrado com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
}));
exports.default = router;
