import request from "/js/lib/request.js";

document.querySelector('#searchbox').addEventListener('keyup', async (e) => {
    
    if(e.keyCode == 13) {
        const value = document.querySelector('#searchbox').value
        alert('Enter Key 감지')
    }
})
