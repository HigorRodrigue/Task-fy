import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'sua_chave_secreta_aqui'; // Em produção, use variável de ambiente

// Middlewares
app.use(cors());
app.use(express.json());

// Tipos
interface User {
    id: string;
    username: string;
    password: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    iniDate?: string;
    endDate?: string;
}

interface AuthRequest extends Request {
    userId?: string;
}

// "Banco de dados" em memória
const users: User[] = [
    { id: '1', username: 'admin', password: 'admin123' },
    { id: '2', username: 'user', password: 'user123' }
];

let tasks: Task[] = [
    {
        id: '1',
        title: 'Implementar autenticação',
        description: 'Adicionar sistema de login com JWT',
        status: 'in-progress',
        priority: 'high',
        iniDate: '2025-01-01',
        endDate: '2025-01-15'
    },
    {
        id: '2',
        title: 'Criar documentação',
        description: 'Documentar todas as rotas da API',
        status: 'done',
        priority: 'medium',
        iniDate: '2025-01-01',
        endDate: '2025-01-05'
    },
    {
        id: '3',
        title: 'Testar API',
        description: 'Testar todas as rotas da API para garantir que funcionam corretamente',
        status: 'todo',
        priority: 'low',
        iniDate: '2025-01-01',
        endDate: '2025-01-10'
    },
    {
        id: '4',
        title: 'Deploy da aplicação',
        description: 'Fazer o deploy da aplicação em um servidor de produção',
        status: 'todo',
        priority: 'medium',
        iniDate: '2025-01-01',
        endDate: '2025-01-20'
    },
    {
        id: '5',
        title: 'Configurar CI/CD',
        description: 'Configurar integração contínua e entrega contínua para o projeto',
        status: 'in-progress',
        priority: 'high',
        iniDate: '2025-01-01',
        endDate: '2025-01-25'
    }
];

// Middleware de autenticação (COMENTADO)
/*
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.token as string;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
*/

// Rotas

// Login
app.post('/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '24h' });

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username
        }
    });
});

// Obter todas as tasks
app.get('/tasks', (req: Request, res: Response) => {
    res.json(tasks);
});

// Obter uma task específica
app.get('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: 'Task não encontrada' });
    }

    res.json(task);
});

// Criar nova task
app.post('/newTask', (req: Request, res: Response) => {
    const taskData = req.body.data;
    
    if (!taskData.title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
    }

    const newTask: Task = {
        id: (tasks.length + 1).toString(),
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        iniDate: taskData.iniDate,
        endDate: taskData.endDate
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Editar task
app.put('/editTask/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const taskData = req.body.data;

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task não encontrada' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: taskData.title || tasks[taskIndex].title,
        description: taskData.description !== undefined ? taskData.description : tasks[taskIndex].description,
        status: taskData.status || tasks[taskIndex].status,
        priority: taskData.priority || tasks[taskIndex].priority,
        iniDate: taskData.iniDate !== undefined ? taskData.iniDate : tasks[taskIndex].iniDate,
        endDate: taskData.endDate !== undefined ? taskData.endDate : tasks[taskIndex].endDate
    };

    res.json(tasks[taskIndex]);
});

// Deletar task
app.delete('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task não encontrada' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deletada com sucesso' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📝 Usuários disponíveis:`);
    console.log(`   - username: admin, password: admin123`);
    console.log(`   - username: user, password: user123`);
});

export default app;