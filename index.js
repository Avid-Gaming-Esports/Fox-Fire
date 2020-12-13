// IMPORTS
const Discord = require("discord.js");
const { GoogleSpreadsheet } = require('google-spreadsheet');
const axios = require("axios");

// PROJECT IMPORTS
const creds = require('./client_secret.json');
const config = require("./config.json");
const constants = require('./constants');
const prefix = "!";

const client = new Discord.Client();

const longPoll = function () {
	const loc = client.channels.cache.get('772345686158082068');
	const twImg1 = 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:' +
		'best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg';
	const twImg2 = 'https://blog.twitch.tv/assets/uploads/03-glitch.jpg';

	axios.defaults.headers.common["Client-ID"] = config.TWITCH_ID;
	axios.defaults.headers.common["Authorization"] = config.TWITCH_OAUTH;

	axios
		.get("https://api.twitch.tv/helix/search/channels?query=avidgamingesports")
		.then(response => {
			if (!isActive) {
				currStream = response.data.data[0]
				if (currStream.is_live) {
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
		})
		.catch(_error => {
			console.log("Failed to fetch Twitch API.");
		});
}

let isActive = false

client.on('ready', function () {
	client.setInterval(longPoll, 60000);
});

client.on("message", async function (message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	// Command handler
	switch(command){
		case "autoassign":
			message.reply("Autoassign method [not implemented yet]");
			break;
		case "quote":
			let quote = constants.QUOTE_LIST[Math.floor(Math.random() * constants.QUOTE_LIST.length)];
			message.channel.send(quote);
			break;
		case "powerrank":
			let resp = "";
			let selector = args[0].toUpperCase()
			if (constants.VALID_ROLES.includes(selector)) {
				const res = await accessSpreadSheet();
				selector = constants.ROLE_MAP[args[0].toUpperCase()]
				// console.log(selector)
				switch(selector) {
					case "ALL":
						resp += "Pulling top 10 power rankings: " + "\n" +
							"#####################################";
						for (let i = 1; i < 11; i++) {
							let idx = i.toString();
							let role = res[idx][2].charAt(0).toUpperCase() + res[idx][2].toLowerCase().slice(1)
							resp += "\n" + idx + " : " + res[idx][0] + ' (' + role + ') ' + ' (' + res[idx][1] + ') '
						}
						break
					default:
						let curr = 1
						resp += "Pulling top 5 players in " + selector + "\n"
						let filtered = Object.keys(res).reduce(function (filtered, key) {
							if (res[key][2] === selector) {
								filtered[curr] = res[key]
								curr += 1
							}
							return filtered;
						}, {});
						for (let i = 1; i < 6; i++) {
							let idx = i.toString();
							let role = selector.charAt(0).toUpperCase() + selector.toLowerCase().slice(1)
							let name = filtered[idx][0].charAt(0).toUpperCase() + filtered[idx][0].slice(1)
							resp += "\n" + idx + " : " + name + ' (' + role + ') '
						}
						break
				}
			} else {
				resp = "Not a valid argument."
			}
			message.channel.send(resp)
			break;
		case "pullstream":
			const loc = client.channels.cache.get('772345686158082068');
			const twImg1 = 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:' +
				'best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg';
			const twImg2 = 'https://blog.twitch.tv/assets/uploads/03-glitch.jpg';
	
			axios.defaults.headers.common["Client-ID"] = config.TWITCH_ID;
			axios.defaults.headers.common["Authorization"] = config.TWITCH_OAUTH;
	
			axios
				.get("https://api.twitch.tv/helix/search/channels?query=avidgamingesports")
				.then(response => {
					currStream = response.data.data[0]
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
				})
				.catch(_error => {
					console.log("Failed to fetch Twitch API.");
				});
			break;
		default:
			message.channel.send("Not a valid command.")
			break;
	}
});

client.on('guildMemberAdd', (guildMember) => {
	console.log("Member added. Attempting to search role");
	var role = guildMember.guild.roles.cache.find(role => role.name === "Member");
	guildMember.roles.add(role);
	console.log("Added role");
});

client.login(config.BOT_TOKEN);

async function accessSpreadSheet() {
	const doc = new GoogleSpreadsheet('1oiKPuIbBt1_4U8IC0jIKz9_IMl4V5_PAqA_jrhdAsuo');
	await doc.useServiceAccountAuth({
		client_email: creds.client_email,
		private_key: creds.private_key,
	});
	await doc.loadInfo();

	const sheet = doc.sheetsById[1076286390];
	const rows = await sheet.getRows({
		offset: 4,
		limit: 100
	})

	res = {}

	rows.forEach((row) => {
		let raws = row._rawData
		res[raws[5]] = [raws[1], raws[2], raws[3]]
	})
	return res
}