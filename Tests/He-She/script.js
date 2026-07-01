function deleteCookies() {
    if (!document.cookie) return
    document.cookie.split('; ').forEach(function(cookie) {
        document.cookie = `${cookie.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${window.location.pathname}`
    });
}

document.querySelector('#reset').addEventListener('click', function() {
    deleteCookies()
    document.querySelectorAll("form").forEach(function(form) {
        form.reset()
    })
    location.reload()
})

function browseCookies() {
    document.cookie.split('; ').forEach(function(cookie) {
        console.log(cookie)
    });
}

function getCookie(name) {
    const cookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return cookie ? cookie[2] : null;
}

function setCookie(name, value, expires = null) {
    if (expires) {
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${window.location.pathname}`
    } else {
        document.cookie = `${name}=${value}; path=${window.location.pathname}`
    }
}

const fileNames = ["F-Airplane.jpeg",
"F-Ball.png",
"F-Butterfly.jpg",
"F-Car.png",
"F-Cat.jpg",
"F-Clock.jpeg",
"F-Duck.jpg",
"F-Eagles.png",
"F-Eyes.jpg",
"F-Flower.jpg",
"F-Giraffe.jpg",
"F-Girl.png",
"F-Keys.jpg",
"F-Onion.jpg",
"F-Parrots.jpg",
"F-Pencils.jpg",
"F-Sun.jpg",
"F-Teeth.png",
"F-Tree.jpg",
"M-Alarm Clock.jpg",
"M-Bird.jpg",
"M-Book.jpg",
"M-Box.jpg",
"M-Boy.png",
"M-Computer.jpg",
"M-Desk.jpg",
"M-Dog.jpg",
"M-Eagle.png",
"M-Elephant.jpg",
"M-Horse.jpg",
"M-Key.jpg",
"M-Lion.jpg",
"M-Monkey.jpg",
"M-Moon.jpg",
"M-Pencil.jpg",
"M-Sheep.jpg",
"M-Whale.jpg"]

if (getCookie('questions') === null || getCookie('correct') === null) {
    deleteCookies()
    setCookie('questions', '0')
    setCookie('correct', '0')
} else{}

if (getCookie('usedNames') === null) {
    setCookie('usedNames',JSON.stringify([]))
} else {
    console.log(JSON.parse(getCookie('usedNames')))
    if (JSON.parse(getCookie('usedNames')).length === fileNames.length) {
        setCookie('lastUsedName',JSON.parse(getCookie('usedNames'))[fileNames.length])
        setCookie('usedNames',JSON.stringify([]))
    }
}

document.querySelector('#score').innerHTML = `
    Questions: ${getCookie('questions')}<br>Correct: ${getCookie('correct')}
`
document.querySelector('#score').style.display = 'block'

let el = ''

if (getCookie('Gender') === null) {
    el = document.querySelector("#question")
    el.style.display = 'block'
    let Name = ''
    if (Math.floor(Math.random() * 2) === 0) {
        el.innerHTML = `
        <form method='post'>
            <input type='submit' disabled name = '1' value='مذكر'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type='submit' disabled name = '1' value='مونث'/><br><br>
        </form>
        <img src='${Name}' style='width: 50%; height: 50%;'>
        `
    } else {
        el.innerHTML = `
        <form method='post'>
            <input type='submit' disabled name = '1' value='مونث'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type='submit' disabled name = '1' value='مذكر'/><br><br>
        </form>
        <img src='${Name}' style='width: 50%; height: 50%;'>
        `
    }

    finish()
}



function finish() {
    document.querySelectorAll("input[type='submit']").forEach(function(button) {
        button.disabled = false
    })
}