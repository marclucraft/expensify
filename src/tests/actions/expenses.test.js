import configureMockStock from 'redux-mock-store'
import thunk from 'redux-thunk'
import { 
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from  '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = "test123"
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStock([thunk])

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt}
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should remove expense from firebase and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
    done()
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { 
      note: 'New note value'
    }
  })
})

test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  const updates = { description: 'updated the description' }
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    })
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(updates.description)
    done()
  })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', (done) => {
 const store = createMockStore(defaultAuthState)
 const expenseData = {
   description: 'Mouse',
   amount: 3000,
   note: 'This one is better',
   createdAt: 1000
 }
 store.dispatch(startAddExpense(expenseData)).then(() => {
   const actions = store.getActions()
   expect(actions[0]).toEqual({
     type: 'ADD_EXPENSE',
     expense: {
       id: expect.any(String),
       ...expenseData
     }
   })
   return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
 }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    })
 
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
     expect(snapshot.val()).toEqual(expenseDefaults)
     done()
   })
})

test('should setup set expenses action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})