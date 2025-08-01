// Função para abrir janelas
function openWindow(windowId) {
    const windowElement = document.getElementById(`window-${windowId}`);
    if (windowElement) {
        windowElement.style.display = 'block';
    }
}

// Função para fechar janelas
function closeWindow(windowId) {
    const windowElement = document.getElementById(`window-${windowId}`);
    if (windowElement) {
        windowElement.style.display = 'none';
    }
}

// Arrastar janelas (código corrigido)
let isDragging = false;
let currentWindow = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.window').forEach(window => {
    const titleBar = window.querySelector('.title-bar');
    
    titleBar.addEventListener('mousedown', (e) => {
        // Impede o arrasto se o clique foi no botão de fechar
        if (e.target.classList.contains('close')) {
            return;
        }
        
        isDragging = true;
        currentWindow = window;
        const rect = window.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // Adicione estas linhas para garantir a posição absoluta
        currentWindow.style.position = 'absolute';
        currentWindow.style.left = `${rect.left}px`;
        currentWindow.style.top = `${rect.top}px`;
    });
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentWindow = null;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
        currentWindow.style.left = `${e.clientX - offsetX}px`;
        currentWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

// Adicione este evento para prevenir conflitos com o botão de fechar
document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Impede a propagação do evento para a barra de título
    });
});

let audioPlayer = document.getElementById("audioPlayer");
        let isPlaying = false;

        function openPlayer() {
            document.getElementById("playerWindow").style.display = "block";
        }

        function closePlayer() {
            document.getElementById("playerWindow").style.display = "none";
            audioPlayer.pause();
        }

        function togglePlayPause() {
            if (isPlaying) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
            isPlaying = !isPlaying;
        }

        function prevTrack() {
            audioPlayer.currentTime = 0;
        }

        function nextTrack() {
            audioPlayer.currentTime = audioPlayer.duration;
        }
        function updateClock() {
            let now = new Date();
            let hours = now.getHours().toString().padStart(2, '0');
            let minutes = now.getMinutes().toString().padStart(2, '0');
            let seconds = now.getSeconds().toString().padStart(2, '0');
            document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
        }

        setInterval(updateClock, 1000); // Atualiza o relógio a cada segundo
        updateClock();