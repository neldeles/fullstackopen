import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => console.log(response))
}

const update = (updatedContact) => {
  // replaces id's old number with a new number
  const url = `${baseUrl}/${updatedContact.id}`
  const request = axios.put(url, updatedContact)
  return request.then(response => response.data)
}

const personsService = { getAll, create, del, update }
export default personsService