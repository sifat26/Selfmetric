import { questions } from './src/data/questions';

const totalScores = { red: 0, yellow: 0, green: 0, blue: 0 };

questions.forEach(q => {
  q.options.forEach(o => {
    totalScores.red += o.scores.red;
    totalScores.yellow += o.scores.yellow;
    totalScores.green += o.scores.green;
    totalScores.blue += o.scores.blue;
  });
});

console.log("Total Points across all options:", totalScores);
