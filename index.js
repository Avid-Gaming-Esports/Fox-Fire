const Discord = require("discord.js");
const config = require("./config.json");

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

client.on("message", function (message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}

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