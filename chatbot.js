const apiUrl = 'https://f52d7osxb3.execute-api.us-east-1.amazonaws.com/prod/chatgpt_english';
const apiKey = 'your_api_key_here';
const chatbotResponseDiv = document.getElementById('chatbot-response');
const inputTextArea = document.getElementById('input-textarea');
const sendButton = document.getElementById('send-button');


sendButton.addEventListener('click', async () => {
  const inputText = inputTextArea.value.trim();
  if (inputText !== '') {
    displayUserMessage(inputText);
    await sleep(500);
    displayTypingMessage();
    await sleep(500);
    const chatbotResponse = await getChatbotResponse(chatbotResponseDiv.innerHTML);
    displayResponse(chatbotResponse);
    inputTextArea.value = '';
  }
});

inputTextArea.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const inputText = inputTextArea.value.trim();
    if (inputText !== '') {
      displayUserMessage(inputText);
      await sleep(500);
      displayTypingMessage();
      await sleep(500);
      const chatbotResponse = await getChatbotResponse(chatbotResponseDiv.innerHTML);
      displayResponse(chatbotResponse);
      inputTextArea.value = '';
    }
  }
});

async function getChatbotResponse(inputText) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'how',
    },
    body: JSON.stringify({
      prompt: inputText
      
    })
  });
  const data = await response.json();
  //return data.choices[0].text.trim();
  console.log(inputText);
  return data['body'];
}

async function bkg_getChatbotResponse(chatbotResponse) {
  console.log(chatbotResponse);
  return "good";
}

function displayUserMessage(inputText) {
  chatbotResponseDiv.innerHTML += `<p><strong>You:</strong> ${inputText}</p>`;
  chatbotResponseDiv.scrollTop = chatbotResponseDiv.scrollHeight;
}

function displayResponse(chatbotResponse) {
  chatbotResponseDiv.innerHTML += `<p><strong>Chatbot:</strong> ${chatbotResponse}</p>`;
  chatbotResponseDiv.scrollTop = chatbotResponseDiv.scrollHeight;
  removeTypingMessage();
}

function displayTypingMessage() {
  chatbotResponseDiv.innerHTML += '<p><em>Chatbot is typing...</em></p>';
  chatbotResponseDiv.scrollTop = chatbotResponseDiv.scrollHeight;
}

function removeTypingMessage() {
  const typingMessage = chatbotResponseDiv.querySelector('p em');
  if (typingMessage) {
    typingMessage.parentElement.remove();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
