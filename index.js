const tmi = require('tmi.js');

// Configuration du bot Twitch
const twitchConfig = {
  options: {
    debug: true, // Affiche les messages de débogage dans la console
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: 'moibot_',
    password: 'oauth:b25bv7bev3gj7qikgk321iz7tdvvq3', // Vous devez obtenir un token OAuth depuis https://twitchapps.com/tmi/
  },
  channels: ['moipol'], // Remplacez par le nom de votre chaîne Twitch
};

// Initialisation du client Twitch
const client = new tmi.client(twitchConfig);

// Événement lorsque le bot est connecté au chat Twitch
client.on('connected', () => {
  console.log('Bot connected to Twitch chat.');
});

// Événement lorsque le bot rejoint une chaîne
client.on('join', (channel, username, self) => {
  if (self) {
    console.log(`Bot has joined ${channel}`);
  }
});

// Événement lorsque le bot reçoit un message dans le chat
client.on('message', (channel, userstate, message, self) => {
  // Vérifier que le message n'a pas été envoyé par le bot lui-même
  if (self) return;

  // Vérifier si le message commence par un préfixe (par exemple, !)
  if (message.startsWith('!hello')) {
    // Répondre avec un message dans le chat Twitch
    client.say(channel, `Bonjour ${userstate.username} !`);
  }

  // Ajoutez d'autres commandes ici en vérifiant le préfixe du message
  // Par exemple, vous pouvez ajouter !bye, !dice, !uptime, etc.
});

// Connexion du bot au chat Twitch
client.connect();
