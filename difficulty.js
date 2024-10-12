document.getElementById('simpleButton').addEventListener('click', () => {
    window.location.href = 'turn.html?mode=simple';
});
document.getElementById('tacticButton').addEventListener('click', () => {
    window.location.href = 'turn.html?mode=tactic';
});
document.getElementById('impossibleButton').addEventListener('click', () => {
    window.location.href = 'turn.html?mode=impossible';
});