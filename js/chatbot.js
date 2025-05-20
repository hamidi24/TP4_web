// Créer une classe pour stocker l'historique des messages
class ChatHistory {
    constructor() {//ligne rajouter pour ne plus avoir l'erreur du push qui s'affiche dans la console
      this.messages = [];
    }
  
    addMessage(message) {
      this.messages.push(message);
    }
  
    getHistory() {
      return this.messages;
    }
}

var historyMessages = new ChatHistory();

// Fonction pour récupérer et traiter le JSON
function fetchJSON(url) {
    // Récupérer le JSON à partir de l'URL fournie
    fetch(url)
    //then est une méthode qui retourne une promesse et prend en paramètre une fonction callback qui sera exécutée une fois la promesse résolue
      .then(response => {
        // Vérifier si la réponse est correcte
        if (!response.ok) {
            // Si la réponse n'est pas correcte, lancer une erreur
          throw new Error('Network response was not ok');
        }
        // Si la réponse est correcte, retourner le JSON
        return response.json();
      })
      //then ici permettra de récupérer le JSON retourné par la promesse
      .then(data => {
        // Vérifier si le JSON est vide ou mal formé
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            // Si le JSON est vide ou mal formé, lancer une erreur
            throw new Error('Empty JSON or malformed JSON');
          }
        //On affiche le JSON dans la console. Il s'agit d'un objet contenant les intentions du chatbot
        console.log(data);
        console.log(historyMessages.getHistory());
        // Passer les intentions à la fonction sendMessage qui sera définie plus tard
        sendMessage(data.intents);
      })
      //catch est une méthode qui retourne une promesse et prend en paramètre une fonction callback qui sera exécutée en cas d'erreur
      .catch(error => {
        // En cas d'erreur, afficher un message d'erreur dans la console
        console.error('There was a problem with the fetch operation:', error);
      });
}

// Fonction pour traiter le message de l'utilisateur
function processMessage(intents, message) {
    // Par défaut, la réponse est "Je suis désolé, je ne suis pas sûr de comprendre."
    let response = "Je suis désolé, je ne suis pas sûr de comprendre.";
    // Parcourir les intentions du chatbot
  
    intents.forEach(intent => {
      // Vérifier si le message de l'utilisateur correspond à l'un des motifs
      intent.patterns.forEach(pattern => {
        // Vérifier si le message de l'utilisateur contient le motif
        if (message.toLowerCase().includes(pattern.toLowerCase())) {
          // Sélectionner une réponse aléatoire parmi les réponses possibles
          response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        }
      });
    });
    // Retourner la réponse
    return response;
}

// Fonction pour afficher un message dans la boîte de chat
function showMessage(message, sender) {
    // Récupérer la boîte de chat
    const chatBox = document.getElementById('chat-box');
    // Créer un élément div pour afficher le message
    const messageElement = document.createElement('div');
    // Ajouter une classe CSS en fonction de l'expéditeur du message
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    //Ajout du message à l'historique
    historyMessages.addMessage({ message, sender });
    // Définir le texte du message
    messageElement.textContent = message;
    // Ajouter le message à la boîte de chat
    chatBox.appendChild(messageElement);
    // Faire défiler la boîte de chat vers le bas pour afficher le dernier message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fonction pour envoyer le message de l'utilisateur
//Elle prend en paramètre les intentions du chatbot
function sendMessage(intents) {
    const userInput = document.getElementById('user-input').value;
    // Afficher le message de l'utilisateur dans la boîte de chat
    showMessage(userInput, 'user');
    // Traiter le message de l'utilisateur et obtenir la réponse du chatbot
    const botResponse = processMessage(intents, userInput);
    // Afficher la réponse du chatbot dans la boîte de chat
    showMessage(botResponse, 'bot');
    // Effacer le champ de saisie
    document.getElementById('user-input').value = '';
}

// création d'une session navigateur pour stocker les messages
function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem('chatHistory', JSON.stringify(historyMessages.getHistory().map(msg => msg.message)));
}

// Fonction pour charger les messages de la session navigateur
function loadMessages() {
    // Récupérer l'historique des messages de la session navigateur
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
            showMessage(message, message.sender);
        });
    }
}

// Charger les messages de la session navigateur au chargement de la page
window.addEventListener('load', loadMessages);

// Enregistrer les messages dans la session navigateur avant de quitter la page
window.addEventListener('beforeunload', saveMessages);




/* *****************   Traitement avec une API externe ********** 
// Appeler l'API externe pour récupérer les intentions du chatbot
fetchJSON('https://api.example.com/chatbot/intents');

// Fonction pour initialiser l'application de chatbot
function initChatbot(data) {
  // Récupérer le bouton d'envoi du formulaire
  const sendButton = document.getElementById('send-button');
  // Ajouter un écouteur d'événements pour envoyer le message de l'utilisateur
  sendButton.addEventListener('click', () => {
    sendMessage(data.intents);
  });
  
  // Récupérer le champ de saisie de l'utilisateur
  const userInput = document.getElementById('user-input');
  // Ajouter un écouteur d'événements pour envoyer le message de l'utilisateur en appuyant sur Entrée
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(data.intents);
    }
  });
}

// Appeler la fonction pour récupérer le JSON
fetchJSON('https://api.example.com/chatbot/intents')
  .then(data => {
    initChatbot(data);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

// Appeler la fonction pour charger les messages de la session navigateur
loadMessages();

// Appeler la fonction pour enregistrer les messages dans la session navigateur avant de quitter la page
saveMessages();
*/