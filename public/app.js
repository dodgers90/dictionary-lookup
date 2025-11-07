const form = document.getElementById('wordForm');
const input = document.getElementById('wordInput');
const result = document.getElementById('result');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const word = input.value.trim();
    result.textContent = 'Loading...';
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) throw new Error('Word not found');
        const data = await res.json();
        const entry = data[0];
        const meanings = entry.meanings.map(m => `
        <div>
            <h3>${m.partOfSpeech}</h3>
            <ul>${m.definitions.map(d => `<li>${d.definition}</li>`).join('')}</ul>
        </div>
        `).join('');
        result.innerHTML = `<h2>${entry.word}</h2>${meanings}`;
    } catch {
        result.textContent = 'No definition found.';
    }
});