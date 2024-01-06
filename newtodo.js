const itemInput = document.getElementById('itemInput')

const addButton = document.getElementById('addButton')

const clearButton = document.getElementById('clearButton')
const todoListelem = document.getElementById('todoList')


let itemlist = []
function addnewtodo() {

    let iteminv = itemInput.value
    let newobj = {
        id: itemlist.length + 1,
        title: iteminv,
        complete: false
    }
    itemlist.push(newobj)
    setlocalStorages(itemlist)

    settodoitem(itemlist)
    itemInput.focus()

}


addButton.addEventListener('click', addnewtodo)


function setlocalStorages(todoslist) { localStorage.setItem('itemlist', JSON.stringify(todoslist)) }


function settodoitem(todoslist) {
    todoListelem.innerHTML = ''
    todoslist.forEach((todo) => {
        const linew = document.createElement('li')
        let labelnew = document.createElement('label')
        let btncom = document.createElement('button')
        let btnde = document.createElement('button')
        linew.className = 'completed well'



        linew.append(labelnew, btncom, btnde)
        todoListelem.append(linew)
        labelnew.innerHTML = todo.title
        itemInput.value = ''

        btncom.className = 'btn btn-success'
        btnde.className = 'btn btn-danger'

        btncom.innerHTML = 'Complete'
        btnde.innerHTML = 'Delete'

        if (todo.complete == true) {
            linew.classList.replace('completed', 'uncompleted')
            btncom.innerHTML='UnComplete'
        }
        else if (todo.complete == false) {
            linew.classList.replace("uncompleted", "completed")
            btncom.innerHTML='Complete'

        }

        btnde.setAttribute('onclick', 'removeItem(' + todo.id + ')')
        btncom.setAttribute('onclick', 'edittodo(' + todo.id + ')')

    });

}
function edittodo(todoid) {
    let localstore = JSON.parse(localStorage.getItem('itemlist'))
    itemlist = localstore
    itemlist.map(function (todo) {
        if (todo.id == todoid) {
            todo.complete = !todo.complete
            return todo
        }
    })
    console.log(itemlist);
    setlocalStorages(itemlist)
    settodoitem(itemlist)
    console.log(todoid);
}



function removeItem(todoid) {
    console.log(todoid);
    let localstore = JSON.parse(localStorage.getItem('itemlist'))
    itemlist = localstore
    let mainindex = itemlist.findIndex(function (todo) {
        return todo.id === todoid
    })
    itemlist.splice(mainindex, 1)
    setlocalStorages(itemlist)
    settodoitem(itemlist)

}
function getlocalstorage() {
    let localstoragetodos = JSON.parse(localStorage.getItem('itemlist'))
    if (localstoragetodos) {
        itemlist = localstoragetodos
    } else {
        itemlist = []
    }
    settodoitem(itemlist)
}


window.addEventListener('load', getlocalstorage)



function clearelocalstorage() {

    itemlist = []
    setlocalStorages(itemlist)
    todoListelem.innerHTML = ''
    localStorage.clear()
}



clearButton.addEventListener('click', clearelocalstorage)

function keypenter(event) {
    if (event.keyCode === 13) {
        addnewtodo()

    }

}

itemInput.addEventListener('keypress', keypenter)
