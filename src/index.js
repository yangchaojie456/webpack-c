import add from './add.js'
import {
    minus
} from './minus.js'

var continer = document.getElementById('show')
document.getElementById('add').onclick = function () {
    continer.innerHTML = add(parseInt(continer.innerHTML), 1)
}
document.getElementById('minus').onclick = function () {
    continer.innerHTML = minus(parseInt(continer.innerHTML), 1)
}

const division = minus(2, 1)
console.log(division)