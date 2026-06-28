function deleteCookies() {
    if (!document.cookie) return
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
    console.log("")
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
        let OP = JSON.parse(getCookie('OPs'))[Math.floor(Math.random() * JSON.parse(getCookie('OPs')).length)]
        console.log(`OP: ${OP}`)
        let num0 = 0
        let num1 = 0
        if (OP === '+') {
            num0 = Math.floor(Math.random() * 10)
            if (num0 === 0) {
                num1 = Math.floor(Math.random() * 10)
            } else {
                num1 = Math.floor(Math.random() * (11-num0))
            }
        } else if (OP === '-') {
            num0 = Math.floor(Math.random() * 10)
            num1 = Math.floor(Math.random() * (num0+1))
        } else {
            let multiplyNum0 = parseInt(getCookie('multiplyNum0'))
            let multiplyNum1 = parseInt(getCookie('multiplyNum1'))
            num0 = multiplyNum0
            num1 = multiplyNum1
            if (multiplyNum1 < 9) {
                multiplyNum1 += 1
            } else {
                multiplyNum1 = 0
                if (multiplyNum0 < parseInt(getCookie('multiplyEnd'))) {
                    multiplyNum0 += 1
                } else {
                    multiplyNum0 = parseInt(getCookie('multiplyBegin'))
                }
            }
            setCookie('multiplyNum0',String(multiplyNum0))
            setCookie('multiplyNum1',String(multiplyNum1))
        }
        el.querySelector('#question').textContent = `${num0} ${OP} ${num1}`
        finish()
        el.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault()
            setCookie('answer',JSON.stringify([num0, OP, num1]))
            location.reload()
        })
    }
}

function finish() {
    document.querySelectorAll("input[type='submit']").forEach(function(button) {
        button.disabled = false
    })
}