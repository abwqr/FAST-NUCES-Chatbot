import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from "axios";

// import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function Chatbot() {
  const { propValue } = useParams();
  useEffect(()=> {
    async function getChat(){

    try{
      
      const config = {
          headers: {
              'Content-Type': 'application/json',
          }
      };
      const body = {
        "user_id": propValue
      }
      // console.log(body)
      // const res = await axios.get("http://127.0.0.1:8000/register")

      const res = await axios.post("http://127.0.0.1:8000/chat", body, config)
      console.log(res.data.data)
      const data = res.data.data
      
      const formattedMessages = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          formattedMessages.push({
            message: data[i].question,
            direction: 'outgoing',
            sender: "user"
          });
        }
        
        if (data[i]) {
          formattedMessages.push({
            message: data[i].answer,
            sentTime: "just now", // You can update this with the actual sent time
            sender: "ChatGPT"
          });
        }
      }
  
      setMessages(prevMessages => [...prevMessages, ...formattedMessages]);
  
  }

  catch(err){
      console.log(err.response)
  }}

  getChat();
},[]);
  


  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const len = apiRequestBody.messages.length-1
        const body = {
          "userid": propValue,
          "question": apiRequestBody.messages[len].content
        }

        console.log(apiRequestBody.messages)
        const res = await axios.post("http://127.0.0.1:8000/chatbot", body, config);
        
        const response = res.data
        console.log(res)

        setMessages([...chatMessages, {
            message: res.data.result,
            sender: "ChatGPT"
          }]);
          setIsTyping(false);

        } catch (err) {
            console.log(err)
        }

    // await fetch("https://api.openai.com/v1/chat/completions", 
    // {
    //   method: "POST",
    //   headers: {
    //     "Authorization": "Bearer " + API_KEY,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(apiRequestBody)
    // }).then((data) => {
    //   return data.json();
    // }).then((data) => {
    //   console.log(data);
    //   setMessages([...chatMessages, {
    //     message: data.choices[0].message.content,
    //     sender: "ChatGPT"
    //   }]);
    //   setIsTyping(false);
    // });
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                // console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default Chatbot