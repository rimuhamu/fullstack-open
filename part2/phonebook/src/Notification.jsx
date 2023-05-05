export function Notification({message}){
    if(message === null){
        return null
    }
    return(
        <div className='added'>
            {message}
        </div>
    )
}