let graficoPizza;

async function fetchDadosGrafico() {
  try {
    const response = await fetch('http://localhost:3000/focos-por-estado-bioma-pizza');
    if (!response.ok) throw new Error('Erro ao buscar dados do backend');
    const data = await response.json();
/*     console.log('Dados recebidos do backend:', data); */
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do gráfico:', error);
    return [];
  }
}

async function renderizaGraficoPizza() {
  const ctx = document.getElementById('graficoPizza');
  if (!ctx || graficoPizza) return; // Evita múltiplos renders

  const dados = await fetchDadosGrafico();
  if (!dados || dados.length === 0) {
    console.error('Nenhum dado disponível para o gráfico.');
    return;
  }
  const labels = dados.map(item => item.label);
  const valores = dados.map(item => item.value);

  console.log('Labels:', labels);
  console.log('Valores:', valores);

  console.log(labels.length)
  console.log(valores.length)

  graficoPizza = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Riscos de Fogo',
        data: valores,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Escuta mudança de aba e renderiza se for "dados"
document.addEventListener('DOMContentLoaded', () => {
  const dadosBtn = document.getElementById('btn-dados');
  if (dadosBtn) {
    dadosBtn.addEventListener('click', () => {
      setTimeout(renderizaGraficoPizza, 100); // Espera o display:block acontecer
    });
  }

  // Também tenta renderizar no carregamento (caso já esteja visível)
  if (document.getElementById('dados')?.classList.contains('active')) {
    renderizaGraficoPizza();
  }
});