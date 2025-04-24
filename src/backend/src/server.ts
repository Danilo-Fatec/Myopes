import express, { Request, Response } from 'express';
import { fetchFocosDeCalor, getFocosPorEstadoBiomaParaPizza, getFocosPorRiscoEstadoParaPizza } from './dataFetcher';
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors())


app.get('/focos', async (req: Request, res: Response) => {
    try {
        const data = await fetchFocosDeCalor();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
    }
});
 
app.get('/focos-por-risco-estado-pizza', async (req, res) => {
    try {
        const data = await getFocosPorRiscoEstadoParaPizza();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

app.get('/focos-por-estado-bioma-pizza', async (req, res) => {
    try {
        const data = await getFocosPorEstadoBiomaParaPizza();
        console.log('Dados enviados para o frontend:', data);
/*         const jsonData = data.map(row => ({
            label: `${row.estado} - ${row.bioma}`,
            value: parseInt(row.total_focos, 10)
        }));
        res.json(jsonData); */
        res.json(data)
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});