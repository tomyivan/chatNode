import io from "socket.io-client"
import {useState, useEffect} from "react";
const socket = io("/")
function App(){
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);
  const handleSubmit = (e)=>{
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages,newMessage]);
    socket.emit('message',message)
  };
  useEffect(()=>{
    socket.on('message', receiveMessage );
    return ()=>{
      socket.off("message",receiveMessage);
    }
  },[])
  const receiveMessage = (message)=>
    setMessages((state)=>[...state,message])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Escribe aqui su mensaje..." 
          onChange={(e)=>setMessage(e.target.value)}  
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {
          messages.map((message,i)=>(
            <li key={i}>
              {message.from}:{message.body}
              </li>
          ))
        }
      </ul>
    </div>
  )
}
export default App