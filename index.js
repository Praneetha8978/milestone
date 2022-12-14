const todoList = () => {
  const all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    const over = []
    all.map((val) => {
      if (val.dueDate === yesterday) {
        over.push(val)
      }
      return over
    })
    return over
  }

  const dueToday = () => {
    const dueTo = []
    all.map((val) => {
      if (val.dueDate === today) {
        dueTo.push(val)
      }
      return dueTo
    })
    return dueTo
  }

  const dueLater = () => {
    const dueLate = []
    all.map((val) => {
      if (val.dueDate === tomorrow) {
        dueLate.push(val)
      }
      return dueLate
    })
    return dueLate
  }

  const toDisplayableList = (list) => {
    let output = ''
    for (let i = 0; i < list.length; i++) {
      if (list[i].completed === true && list[i].dueDate === today) {
        output += '[x]' + ' ' + list[i].title + '\n'
      } else if (list[i].dueDate === today) {
        output += '[ ]' + ' ' + list[i].title + '\n'
      } else if (list[i].dueDate === yesterday) {
        output += '[ ]' + ' ' + list[i].title + ' ' + list[i].dueDate + '\n'
      } else if (list[i].dueDate === tomorrow) {
        output += '[ ]' + ' ' + list[i].title + ' ' + list[i].dueDate + '\n'
      }
    }
    return output
  }

  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList }
}

const todos = todoList()

const formattedDate = d => {
  return d.toISOString().split('T')[0]
}

const dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log('My Todo-list\n\n')

console.log('Overdue')
const overdues = todos.overdue()
const formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log('\n\n')

console.log('Due Today')
const itemsDueToday = todos.dueToday()
const formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log('\n\n')

console.log('Due Later')
const itemsDueLater = todos.dueLater()
const formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log('\n\n')
