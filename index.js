// IMPORTS
const axios = require("axios");
const battlefy = require("battlefy-api")
const Discord = require("discord.js");
const { GoogleSpreadsheet } = require('google-spreadsheet');

// PROJECT IMPORTS
const creds = require('./client_secret.json');
const config = require("./config.json");
const constants = require('./constants');

const client = new Discord.Client();

const tournamentApi = axios.create({
	baseURL: 'https://dtmwra1jsgyb0.cloudfront.net/'
})

let isActive = false

client.on('ready', function () {
	client.setInterval(longPoll, 60000);
});

client.on("message", async function (message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(constants.PREFIX)) return;

	const commandBody = message.content.slice(constants.PREFIX.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	// Command handler
	switch (command) {
		case "autoassign":
			message.reply("Autoassign method [not implemented yet]");
			break;
		case "ff":
			message.channel.send(constants.HELP_MSG)
			break;
		case "powerrank":
			let resp = "";
			let selector = args[0].toUpperCase()
			if (constants.VALID_ROLES.includes(selector)) {
				const res = await accessSpreadSheet();
				selector = constants.ROLE_MAP[args[0].toUpperCase()]
				// console.log(selector)
				switch (selector) {
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
				resp = "Not a valid argument. Format is as follows: !powerrank [ALL or POSITION]. "
			}
			message.channel.send(resp)
			break;
		case "pullstream":
			const loc = client.channels.cache.get('772345686158082068');

			axios.defaults.headers.common["Client-ID"] = config.TWITCH_ID;
			axios.defaults.headers.common["Authorization"] = config.TWITCH_OAUTH;

			axios
				.get("https://api.twitch.tv/helix/search/channels?query=avidgamingesports")
				.then(response => {
					currStream = response.data.data[0]
					const linkEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle(currStream.title)
						.setURL(constants.TW_URL)
						.setAuthor('avidgamingesports', constants.TW_IMG1,
							constants.TW_URL)
						.setThumbnail(constants.TW_IMG2)
						.setTimestamp()
					loc.send('AvidGamingEsports is now live! ' + `@everyone`)
					loc.send(linkEmbed)
				})
				.catch(_error => {
					console.log("Failed to fetch Twitch API.");
				});
			break;
		case "quote":
			let quote = constants.QUOTE_LIST[Math.floor(Math.random() * constants.QUOTE_LIST.length)];
			message.channel.send(quote);
			break;
		case "standings":
			let res = await getTournamentStageMatches("5fb86cf65caa4f5e4bc861fd");
			let sorted = Object.keys(res).map(function(key) {
				return [key, res[key]];
			});
			sorted.sort(function(first, second) {
				return second[1][0] - first[1][0];
			}) 
			let standings = "Here are the current standings: \n \n";
			for (item in sorted) {
				standings += "*" + (parseInt(item)+1).toString() + ": " + sorted[item][0] 
					+ "* (W: " + sorted[item][1][0] + " L: " + sorted[item][1][1] + ")\n";
			}
			message.channel.send(standings);
			break;
		default:
			message.channel.send("Not a valid command. Type !ff for help. ");
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

function longPoll() {
	const loc = client.channels.cache.get('772345686158082068');

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
						.setURL(constants.TW_URL)
						.setAuthor('avidgamingesports', constants.TW_IMG1,
							constants.TW_URL)
						.setThumbnail(constants.TW_IMG2)
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


async function getTournamentStageMatches(stage) {
	const response = await tournamentApi.get(`stages/${stage}/matches`);
	let teams = {
		"Rubber Ducky Team" : [0, 0],
		"Luck of the Draw" : [0, 0],
		"ULTIMATE DAN" : [0, 0],
		"On the Spot" : [0, 0],
		"Mailbox's Angels" : [0, 0],
		"BaeDCarry Fan Club" : [0, 0],
		"Natural Big Boys Club" : [0, 0],
		"Frank n' Beans" : [0, 0],
		"LAMAR JACKSON FAN CLUB" : [0, 0],
		"Big Shmeat Gang" : [0, 0]
	}
	for (match in response.data) {
		var winner;
		if (response.data[match].top.winner === true) {
			winner = 'top';
			teams[response.data[match].top.team.name][0] += 1;
			teams[response.data[match].bottom.team.name][1] += 1;
		} else if (response.data[match].top.winner === false) {
			winner = 'bottom';
			teams[response.data[match].top.team.name][1] += 1;
			teams[response.data[match].bottom.team.name][0] += 1;
		} else {
			winner = 'undefined';
		}
		response.data[match].winner = winner;
	}
	return teams;
}