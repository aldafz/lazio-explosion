// 1. DATABASE CALCIATORI (10 per ruolo)
const playersDB = {
    "PORTIERI": [
        { name: "Marchegiani", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Luca_Marchegiani_Lazio.jpg" },
        { name: "Peruzzi", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Angelo_Peruzzi.jpg/250px-Angelo_Peruzzi.jpg" },
        { name: "Provedel", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Ivan_Provedel_2022.jpg/250px-Ivan_Provedel_2022.jpg" },
        { name: "Pulici", img: "https://upload.wikimedia.org/wikipedia/it/thumb/c/ca/Felice_Pulici_Lazio.jpg/250px-Felice_Pulici_Lazio.jpg" },
        { name: "Lovati", img: "" }, { name: "Cei", img: "" }, { name: "Orsi", img: "" }, { name: "Sentimenti IV", img: "" }, { name: "Muslera", img: "" }, { name: "Marchetti", img: "" }
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
        { name: "Klose", img: "" }, { name: "Signori", img: "" }, { name: "Giordano", img: "" }, { name: "Salas", img: "" }, { name: "Crespo", img: "" }, { name: "Boksic", img: "" }, { name: "Rocchi", img: "" }
    ]
};

// 2. DATABASE COREOGRAFIE
const choreos = [
    { id: 'c1', title: "Centenario 1900-2000", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Stadio_Olimpico_di_Roma.jpg/640px-Stadio_Olimpico_di_Roma.jpg" },
    { id: 'c2', title: "Aquila Derby 2013", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/SS_Lazio_logo.svg/640px-SS_Lazio_logo.svg.png" },
    { id: 'c3', title: "La Banda del '74", img: "https://upload.wikimedia.org/wikipedia/it/thumb/a/a5/Tommaso_Maestrelli.jpg/250px-Tommaso_Maestrelli.jpg" }
];

// 3. DATABASE AUDIO (Link esterni diretti)
const chantsAudio = {
    '50s': 'https://www.soundjay.com/human/sounds/applause-01.mp3',
    '74s': 'https://www.soundjay.com/human/sounds/crowd-cheer-01.mp3',
    '90s': 'https://actions.google.com/sounds/v1/crowds/stadium_cheer.ogg',
    'modern': 'https://actions.google.com/sounds/v1/crowds/crowd_outdoor_festive.ogg'
};

// LOGICA VOTI
let choreoVotes = JSON.parse(localStorage.getItem('choreoVotes')) || { c1: 0, c2: 0, c3: 0 };
let currentAudio = null;

function init() {
    // Caricamento Calciatori
    const pContainer = document.getElementById('voting-container');
    for (let role in playersDB) {
        playersDB[role].forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<img src="${p.img || 'https://via.placeholder.com/250?text=S.S.+Lazio'}" alt="${p.name}"><h3>${p.name}</h3><button class="giant-btn blue" onclick="alert('Votato ${p.name}')">VOTA</button>`;
            pContainer.appendChild(card);
        });
    }

    // Caricamento Coreografie
    const cGrid = document.getElementById('choreo-grid');
    choreos.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${c.img}" alt="${c.title}"><h3>${c.title}</h3><button class="giant-btn green" onclick="voteChoreo('${c.id}')">VOTA COREO</button>`;
        cGrid.appendChild(card);
    });

    // Caricamento Tattiche
    const tGrid = document.getElementById('tactics-container');
    const tactics = [
        { name: "Maestrelli (Total 4-3-3)", desc: "Vs Ajax di Michels" },
        { name: "Eriksson (4-4-2 Diamond)", desc: "Vs Real Galacticos" },
        { name: "Sarrismo (Vertical 4-3-3)", desc: "Vs Man City Guardiola" }
    ];
    tactics.forEach(t => {
        tGrid.innerHTML += `<div class="card"><h3>${t.name}</h3><p>${t.desc}</p><button class="giant-btn gold" onclick="alert('Voto registrato!')">SCEGLI TATTICA</button></div>`;
    });

    updateStats();
}

function voteChoreo(id) {
    choreoVotes[id] = (choreoVotes[id] || 0) + 1;
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
        card.innerHTML = `<img src="https://api.dicebear.com/7.x/bottts/svg?seed=${name}" alt="${name}"><h3>${name.toUpperCase()}</h3><p>Acquisto Mondiale</p>`;
        squad.appendChild(card);
        document.getElementById('world-input').value = "";
    }
}

function playChant(era) {
    if (currentAudio) { currentAudio.pause(); }
    currentAudio = new Audio(chantsAudio[era]);
    currentAudio.play().catch(() => alert("Interagisci con la pagina per attivare l'audio!"));
    document.getElementById('audio-info').innerText = "🔊 Suonando coro: " + era.toUpperCase();
}

window.onload = init;
