// server.ts
import express, { Request, Response } from 'express';
import { fetchFocosDeCalor, getFocosPorEstadoBiomaParaPizza, getFocosPorRiscoEstadoParaPizza } from './dataFetcher'; // Certifique-se do caminho correto

const app = express();
const port = 3000;

// Outras configurações do Express (middleware, etc.) podem vir aqui

// Definição da rota para buscar todos os focos
app.get('/focos', async (req: Request, res: Response) => {
    try {
        const data = await fetchFocosDeCalor();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
    }
});

// Definição da rota para buscar focos por risco e estado 
app.get('/focos-por-risco-estado-pizza', async (req, res) => {
    try {
        const data = await getFocosPorRiscoEstadoParaPizza();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

// *** Coloque a nova rota AQUI ***
app.get('/focos-por-estado-bioma-pizza', async (req, res) => {
    try {
        const data = await getFocosPorEstadoBiomaParaPizza();
        const jsonData = data.map(row => ({
            label: `${row.estado} - ${row.bioma}`,
            value: parseInt(row.total_focos, 10)
        }));
        res.json(jsonData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});