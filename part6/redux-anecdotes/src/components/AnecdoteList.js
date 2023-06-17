import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

    const anecdotes = useSelector((state) =>
        state.filter
            ? state.anecdotes.filter((anecdote) =>
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            )
            : state.anecdotes
    )

    const anecdotesSorted = [...anecdotes].sort((a, b) => {
        return b.votes - a.votes
    })

    const dispatch = useDispatch();

    const handleVote = anecdote => {
        dispatch(voteAnecdote(anecdote))
        dispatch(createNotification(`you voted ${anecdote.content}`, 3))
    }

    return (
        <>
            {anecdotesSorted.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList