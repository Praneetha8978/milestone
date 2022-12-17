const todoList = () => {
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
module.exports = todoList
