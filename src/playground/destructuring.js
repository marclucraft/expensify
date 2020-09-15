//
//  Object Destructuring
//

// const person = {
//   name: 'Marc',
//   age: 33,
//   location: {
//     city: 'Essex',
//     temp: 22
//   }
// }

// const { name: firstName = 'Anon', age } = person
// console.log(`${firstName} is ${age}.`)

// const { city, temp: temperature } = person.location
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`)
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//   }
// }

// const {name: publisherName = 'Self-published'} = book.publisher

// console.log(publisherName) // Penguin, Self-published

//
//  Array Destructuring
//

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147']
// const [, city, state = 'New York'] = address
// console.log(`You are in ${city}, ${state}`)

const item = ['Coffee (hot)', '£2.00', '£2.50', '£2.75']
const [ first, , third ] = item
console.log(`A medium ${first} costs ${third}`)

