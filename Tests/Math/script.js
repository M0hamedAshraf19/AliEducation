function deleteCookies() {
    const cookies = (document.cookie.split('; '))
    cookies.forEach(function(cookie) {
        document.cookie = `${cookie.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    });
}
// deleteCookies()

function browseCookies() {
    const cookies = (document.cookie.split('; '))
    cookies.forEach(function(cookie) {
        console.log(cookie)
    });
}
// browseCookies()

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : null;
}

function setCookie(name, value, expires = null) {
    if (expires) {
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
    } else {
        document.cookie = `${name}=${value}; path=/`
    }
}

if (getCookie('questions') === null || getCookie('correct') === null) {
    deleteCookies()
    setCookie('questions', '0')
    setCookie('correct', '0')
} else {

}

let el = ''

if (getCookie('OPs') === null) {
    el = document.querySelector('#chooseOP')
    el.style.display = ''
    finish()
    el.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault()
        let checked = el.querySelectorAll("input[type='checkbox']:checked")
        let selectedOPs = []
        checked.forEach(function(checkbox) {
            selectedOPs.push(checkbox.value)
        })
        if (selectedOPs.length === 0) {
            alert('You Have to choose')
            return
        }
        console.log(selectedOPs)
        setCookie('OPs',JSON.stringify(selectedOPs))
        location.reload()
    })
} else {
    if (JSON.parse(getCookie('OPs')).includes('×') && (getCookie('multiplyBegin') === null || getCookie('multiplyEnd') === null)) {
        el = document.querySelector('#setMultiplication')
        el.style.display = ''
        finish()
        el.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault()
            let multiplyBegin = el.querySelector("select[name='multiplyBegin']").value
            let multiplyEnd = el.querySelector("select[name='multiplyEnd']").value
            setCookie('multiplyBegin',multiplyBegin)
            setCookie('multiplyEnd',multiplyEnd)
            setCookie('multiplyNum0',multiplyBegin)
            setCookie('multiplyNum1','0')
            location.reload()
        })
    } else {
        el = document.querySelector('#questionForm')
        el.style.display = ''
        finish()
    }
}

// let div = document.querySelector("#chooseOP")
// console.log(div)
// if (div.style.display === "none") {
//     console.log("hidden")
// } else {
//     console.log("visible")
// }

// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelector("input[type='submit']").disabled = false

//     document.querySelector("form").addEventListener("submit", function(e) {
//         // if (document.querySelector("#answer").value.trim() === "") {
//         //     e.preventDefault()
//         // }

//         e.preventDefault()

//         let checked = document.querySelectorAll("input[type='checkbox']:checked")
        
//         let selectedOPs = []
//         checked.forEach(function(checkbox) {
//             selectedOPs.push(checkbox.value)
//         })

//         if (selectedOPs.length === 0) {
//             alert("You Have to choose")
//             return
//         }

//         console.log(selectedOPs)
//     })
// })

function finish() {
    document.querySelectorAll("input[type='submit']").forEach(function(button) {
        button.disabled = false
    })
}