const chatContainer = document.getElementById('chatContainer');
const chat = document.getElementById('chat');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const backendImage = document.getElementById('backendImage'); 

userInput.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    appendMessage('user', userMessage);
    userInput.value = '';
    userInput.focus();

    fetch('http://127.0.0.1:5000/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        const botIdea = data.idea; // Access the idea from the response
        const botImage = data.image; // Access the image URL from the response
        
        appendMessage('bot', botIdea);
        backendImage.src = botImage; // Set the source of the backendImage element
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}
