const Discord = require("discord.js");
const config = require("./config.json");
const axios = require("axios")
const client = new Discord.Client();

const prefix = "!";
const QUOTE_LIST = [
	"Don't you trust me?",
	"Play time's over.",
	"Shall we?",
	"Indulge me.",
	"How tempting.",
	"Don't hold back.",
	"Tell me a secret.",
  "Don't you trust me?",
  "I know what they desire.",
  "Play time's over.",
  "They're mine now.",
  "It's too late for mercy.",
  "Let's have some real fun.",
  "No one will stand in my way.",
	"They've exhausted their use.",
	"If you'd like to play with me, you'd better be sure you know the game.",
	"Come try your luck, if you think you're in my league.",
	"Should I make your pulse rise? Or... STOP!",
]

const longPoll = function() {
	// console.log("isActive: " + isActive);
	const loc = client.channels.cache.get('772345686158082068');
	const twImg1 = 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:' + 
		'best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg';
	const twImg2 = 'https://blog.twitch.tv/assets/uploads/03-glitch.jpg';

	axios.defaults.headers.common["Client-ID"] = config.TWITCH_ID;
	axios.defaults.headers.common["Authorization"] = config.TWITCH_OAUTH;

	axios
		.get("https://api.twitch.tv/helix/search/channels?query=avidgamingesports")
		.then(response => {
			// console.log(response.data.data[0].is_live)
			// console.log(client.user.username)
			if(!isActive) {
				currStream = response.data.data[0]
				if(currStream.is_live) {
					// Send the message
					const linkEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(currStream.title)
					.setURL('https://www.twitch.tv/avidgamingesports')
					.setAuthor('avidgamingesports', twImg1, 
						'https://www.twitch.tv/avidgamingesports')
					.setThumbnail(twImg2)
					.setTimestamp()
					loc.send('AvidGamingEsports is now live! ' + `@everyone`)
					loc.send(linkEmbed)
				}
			}
			isActive = response.data.data[0].is_live

			// console.log(response.data.data);
			// console.log(response.data.data.length);
		})
		.catch(error => {
			console.log(error);
		});
}

let isActive = false

client.on('ready', function() {
  client.setInterval(longPoll, 60000);
});

client.on("message", function (message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (command === "autoassign") {
		// let role = message.guild.roles.cache.find(r => r.name === "Member");
		// message.reply(role.toString())
		// let guild = message.guild;
		message.reply("Autoassign method [not implemented yet]");
		// guild.members.filter(member => member.roles.array().length > 0).forEach(member => member.addRole(role));
	}

	if (command === "quote") {
		let quote = QUOTE_LIST[Math.floor(Math.random() * QUOTE_LIST.length)];
		message.channel.send(quote);
	}

});

client.on('guildMemberAdd', (guildMember) => {
	console.log("Member added. Attempting to search role");
	var role = guildMember.guild.roles.cache.find(role => role.name === "Member");
	guildMember.roles.add(role);
	console.log("Added role");
});

client.login(config.BOT_TOKEN);