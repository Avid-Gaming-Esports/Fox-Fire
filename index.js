const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

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

	if (command === "test") {
		var role = message.guild.roles.cache.find(role => role.name === "Member");
		message.member.roles.add(role);
		message.reply("Member Role Added!");
	}

});

client.on('guildMemberAdd', (guildMember) => {
	console.log("Member added. Attempting to search role");
	var role = guildMember.guild.roles.cache.find(role => role.name === "Member");
	guildMember.roles.add(role);
	console.log("Added role");
});

client.login(config.BOT_TOKEN);