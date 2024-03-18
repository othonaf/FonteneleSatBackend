import app from "./app";
import login from './login';
import criarUsuario from './criarUsuario';


// Rota para o Endpoint de Login:
app.use('/api', login)

// Rota para o Endpoint de criar Usuário.
app.use('/api', criarUsuario)
