import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const id = getId()
    const object = { content, id, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (anecdote) => {
    const { id } = anecdote
    const votes = { votes: anecdote.votes + 1 }
    const response = await axios.patch(`${baseUrl}/${id}`, votes)
    return response.data
}


export default { getAll, createNew, update }