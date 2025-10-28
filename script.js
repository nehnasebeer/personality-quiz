console.log("script.js connected!");
);
// Add selected state to clicked button
btn.classList.add('selected', 'btn-primary');
btn.classList.remove('btn-outline-primary');


// Save selection
selections[idx] = btn.dataset.category; // Explorer | Artist | Leader | Thinker
// Debug: console.log(selections);
});
});
});


// Mapping from categories to final city results
const RESULTS = {
Explorer: {
title: "You belong in Mexico City 🇲🇽",
body: "Vibrant neighborhoods, street food, and endless discovery. You thrive where every corner is a new story.",
},
Artist: {
title: "You belong in Paris 🇫🇷",
body: "Museums, music, and cafés. Your soul comes alive around beauty, art, and thoughtful vibes.",
},
Leader: {
title: "You belong in New York City 🇺🇸",
body: "Fast pace, big dreams. You execute, network, and make things happen daily.",
},
Thinker: {
title: "You belong in Copenhagen 🇩🇰",
body: "Calm, clean design, bike paths, and deep talks. You value balance and clarity.",
},
};


function displayResult() {
// Validate all questions answered
const totalQuestions = blocks.length;
const answered = Object.keys(selections).length;
if (answered < totalQuestions) {
const missing = totalQuestions - answered;
const msg = missing === 1 ? 'Please answer the remaining question.' : `Please answer the remaining ${missing} questions.`;
return updateResult({
title: 'Almost there…',
body: msg,
});
}


// Tally categories
const tally = { Explorer: 0, Artist: 0, Leader: 0, Thinker: 0 };
Object.values(selections).forEach(cat => {
if (tally.hasOwnProperty(cat)) tally[cat]++;
});


// Find the max category 
const order = ['Leader', 'Artist', 'Explorer', 'Thinker'];
let winner = order[0];
let max = -1;
for (const cat of Object.keys(tally)) {
if (tally[cat] > max || (tally[cat] === max && order.indexOf(cat) < order.indexOf(winner))) {
max = tally[cat];
winner = cat;
}
}


const result = RESULTS[winner];
updateResult(result);
}


function updateResult({ title, body }) {
const titleEl = document.querySelector('#result-container h2');
const textEl = document.getElementById('result-text');
titleEl.textContent = title || 'Your City Match';
textEl.textContent = body || '';
}


const resultBtn = document.getElementById('resultBtn');
resultBtn.addEventListener('click', displayResult);
