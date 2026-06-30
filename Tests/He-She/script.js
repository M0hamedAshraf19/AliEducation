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

// 