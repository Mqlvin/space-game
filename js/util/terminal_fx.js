let total = 1;

function scrollTerminalLines() {
    setInterval(() => {
        total = (total == 0) ? 1 : 0;
        document.documentElement.style.setProperty('--scroll', (total + 1) + 'px'); 
        document.documentElement.style.setProperty('--scroll-second', (total + 2) + 'px');
    }, 100);
}