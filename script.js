// Simple Neural Network Simulation
function trainNetwork() {
  const epochs = document.getElementById("epochs").value;
  let output = `Training neural network for ${epochs} epochs...\n`;

  let weights = [Math.random(), Math.random()];
  let learningRate = 0.1;
  let trainingData = [
    { inputs: [0, 0], target: 0 },
    { inputs: [0, 1], target: 1 },
    { inputs: [1, 0], target: 1 },
    { inputs: [1, 1], target: 0 }
  ];

  for (let epoch = 0; epoch < epochs; epoch++) {
    trainingData.forEach(data => {
      let sum = data.inputs[0] * weights[0] + data.inputs[1] * weights[1];
      let prediction = sum > 0.5 ? 1 : 0;
      let error = data.target - prediction;

      weights[0] += learningRate * error * data.inputs[0];
      weights[1] += learningRate * error * data.inputs[1];
    });
  }

  output += `Trained Weights: [${weights[0].toFixed(2)}, ${weights[1].toFixed(2)}]`;
  document.getElementById("networkOutput").innerText = output;
}

// Simple Genetic Algorithm
function runGeneticAlgorithm() {
  let output = "Running genetic algorithm...\n";

  function generatePopulation(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  }

  function fitness(value) {
    return Math.abs(value - 42);
  }

  let population = generatePopulation(10);
  let generation = 0;

  while (generation < 10) {
    population.sort((a, b) => fitness(a) - fitness(b));
    let fittest = population[0];

    output += `Generation ${generation + 1}: Best Candidate = ${fittest}\n`;

    if (fitness(fittest) === 0) break;

    population = population.slice(0, 5).concat(generatePopulation(5));
    generation++;
  }

  document.getElementById("gaOutput").innerText = output;
}

// Particle Swarm Optimization Simulation
function runPSO() {
  const canvas = document.getElementById("psoCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const particles = Array.from({ length: 20 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
  document.getElementById("psoOutput").innerText = "Particle Swarm Optimization running...";
}
