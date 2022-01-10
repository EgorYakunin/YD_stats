const test = document.querySelector('.test')

fetch('http://localhost:6969/get-data').then( res => res.json()).then((data) => {
    console.log(data)
    data.forEach((e) => {
        test.innerHTML += `<h1 class="testred">${e.user_ip}</h1>`
    })
})

