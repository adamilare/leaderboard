import './style.css';
import { getScores, submitScore } from './games.js';

const scoresListElement = document.querySelector('#recent-scores');
const submitBtn = document.querySelector('button[type="submit"]');
const refreshBtn = document.querySelector('#refresh');
const scoreItem = (name, score) => `<li class="score-item" data-ref="">
            <span class="name">${name}:</span><span class="score">${score}</span>
          </li>`;

const renderScores = async () => {
  const scores = await getScores();
  if (scores) {
    scoresListElement.innerHTML = scores.result
      .map((score) => scoreItem(score.user, score.score))
      .join('');
  }
};

const submit = async () => {
  const name = document.querySelector('input[name="name"]');
  const score = document.querySelector('input[name="score"]');

  if (name && score) await submitScore(name.value, score.value);
  name.value = '';
  score.value = '';
  renderScores();
};

refreshBtn.addEventListener('click', () => renderScores());

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  submit();
});

renderScores();
