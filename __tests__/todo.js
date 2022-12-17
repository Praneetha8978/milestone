/* eslint-disable no-undef */
const todoList = require('../todo')

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList()
describe('TodoList Test Suite', () => {
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
  beforeAll(() => {
    add({ title: 'Test Today', completed: false, dueDate: new Date().toLocaleDateString('en-CA') })
    add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
    add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
    add({ title: 'File taxes', dueDate: tomorrow, completed: false })
    add({ title: 'Service Vehicle', dueDate: today, completed: false })
  })
  test('Should add new todo', () => {
    const todoItemsCount = all.length
    add({
      title: 'Test Today',
      completed: false,
      dueDate: new Date().toLocaleDateString('en-CA')
    })
    expect(all.length).toBe(todoItemsCount + 1)
  })
  test('Mark As Complete', () => {
    expect(all[0].completed).toBe(false)
    markAsComplete(0)
    expect(all[0].completed).toBe(true)
  })
  test('Checks Of Overdue Items', () => {
    const over = overdue()
    expect(all[1].title).toBe(over[0].title)
    expect(all[1].dueDate).toBe(over[0].dueDate)
    expect(all[1].completed).toBe(over[0].completed)
  })
  test('Checks Of DueToday Items', () => {
    const due = dueToday()
    expect(all[4].title).toBe(due[1].title)
    expect(all[4].dueDate).toBe(due[1].dueDate)
    expect(all[4].completed).toBe(due[1].completed)
  })
  test('Checks Of DueLater Items', () => {
    const dueLater1 = dueLater()
    expect(all[2].title).toBe(dueLater1[0].title)
    expect(all[2].dueDate).toBe(dueLater1[0].dueDate)
    expect(all[2].completed).toBe(dueLater1[0].completed)
    expect(all[3].title).toBe(dueLater1[1].title)
    expect(all[3].dueDate).toBe(dueLater1[1].dueDate)
    expect(all[3].completed).toBe(dueLater1[1].completed)
  })
})
