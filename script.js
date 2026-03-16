// DATABASE CALCIATORI (10 per ruolo - Esempi con foto libere)
const playersDB = {
    "PORTIERI": [
        { name: "Marchegiani", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Luca_Marchegiani_Lazio.jpg" },
        { name: "Peruzzi", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Angelo_Peruzzi.jpg/250px-Angelo_Peruzzi.jpg" },
        { name: "Provedel", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Ivan_Provedel_2022.jpg/250px-Ivan_Provedel_2022.jpg" },
        { name: "Pulici", img: "" }, { name: "Lovati", img: "" }, { name: "Cei", img: "" }, { name: "Orsi", img: "" }, { name: "Sentimenti IV", img: "" }, { name: "Muslera", img: "" }, { name: "Marchetti", img: "" }
    ],
    "DIFENSORI": [
        { name: "Nesta", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Alessandro_Nesta_2010.jpg/250px-Alessandro_Nesta_2010.jpg" },
        { name: "Mihajlovic", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Sini%C5%A1a_Mihajlovi%C4%87.jpg/250px-Sini%C5%A1a_Mihajlovi%C4%87.jpg" },
        { name: "Stam", img: "" }, { name: "Wilson", img: "" }, { name: "Radu", img: "" }, { name: "Favalli", img: "" }, { name: "Couto", img: "" }, { name: "Oddo", img: "" }, { name: "Pancaro", img: "" }, { name: "Negro", img: "" }
    ],
    "ATTACCANTI": [
        { name: "Immobile", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ciro_Immobile_Lazio.jpg/250px-Ciro_Immobile_Lazio.jpg" },
        { name: "Chinaglia", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Giorgio_Chinaglia_Lazio.jpg/250px-Giorgio_Chinaglia_Lazio.jpg" },
        { name: "Piola", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Silvio_Piola.jpg/250px-Silvio_Piola.jpg" },
        { name: "Signori", img: "" }, { name: "Klose", img: "" }, { name: "Giordano", img: "" }, { name: "Salas", img: "" }, { name: "Crespo", img: "" }, { name: "Boksic", img: "" }, { name: "Rocchi", img: "" }
    ]
};

// DATABASE COREOGRAFIE
const choreos = [
    { id: 'c1', title: "Centenario 1900-2000", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Stadio_Olimpico_di_Roma.jpg/640px-Stadio_Olimpico_di_Roma.jpg" },
    { id: 'c2', title: "Aquila nel Derby", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/SS_Lazio_logo.svg/640px-SS_Lazio_logo.svg.png" }
];

// INIZIALIZZAZIONE VOTI (LocalStorage)
let choreoVotes = JSON.parse(localStorage.getItem('choreoVotes')) || { c1: 0, c2: 0 };

function init() {
    // Carica Calciatori
    const pContainer = document.getElementById('voting-container');
    for (let role in playersDB) {
        playersDB[role].forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<img src="${p.img || 'https://via.placeholder.com/250?text=Lazio+Legend'}" alt="${p.name}"><h3>${p.name}</h3><button class="giant-btn blue" onclick="alert('Votato ${p.name}')">VOTA</button>`;
            pContainer.appendChild(card);
        });
    }

    // Carica Coreografie
    const cGrid = document.getElementById('choreo-grid');
    choreos.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${c.img}" alt="${c.title}"><h3>${c.title}</h3><button class="giant-btn green" onclick="voteChoreo('${c.id}')">VOTA</button>`;
        cGrid.appendChild(card);
    });
    updateStats();
}

function voteChoreo(id) {
    choreoVotes[id]++;
    localStorage.setItem('choreoVotes', JSON.stringify(choreoVotes));
    updateStats();
}

function updateStats() {
    const res = document.getElementById('choreo-results');
    res.innerHTML = "";
    choreos.forEach(c => {
        res.innerHTML += `<div class="result-row"><span>${c.title}</span><strong>${choreoVotes[c.id]} voti</strong></div>`;
    });
}

function addWorldStar() {
    const name = document.getElementById('world-input').value;
    if (name) {
        const squad = document.getElementById('world-squad');
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${name}" alt="${name}"><h3>${name.toUpperCase()}</h3><p>In Biancoceleste</p>`;
        squad.appendChild(card);
        document.getElementById('world-input').value = "";
    }
}

function playChant(era) {
    alert("Audio simulato per l'epoca: " + era + ". (Carica i tuoi MP3 nella cartella /audio per attivarli davvero!)");
}

window.onload = init;
