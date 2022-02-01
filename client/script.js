fetch('http://localhost:6969/client').then( res => res.json()).then(data => console.log())

// When user leaves the page
window.onbeforeunload = () => {
    fetch('http://localhost:6969/client-exit').then()
}