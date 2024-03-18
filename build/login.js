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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, senha } = req.body;
    try {
        const result = yield connection_1.default.raw(`
            SELECT * FROM usuarios WHERE nome = '${nome}'
          `);
        console.log(result);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        const user = result.rows[0];
        const passwordMatch = yield bcrypt_1.default.compare(senha, user.senha);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }
        const token = jsonwebtoken_1.default.sign({ nome: user.nome, tipo: user.tipo }, 'f1#z8.sqt', {
            expiresIn: '2h', algorithm: 'HS256'
        });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
}));
exports.default = router;
