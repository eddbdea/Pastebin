function retrieveText(txt) {
    let text = txt;
    window.location.href = '/list/complete-text';
    const completeText = document.getElementById('final-text');
    completeText.innerText = text;
}
