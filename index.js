// IMPORTS
const axios = require("axios");
const Discord = require("discord.js");
const { GoogleSpreadsheet } = require("google-spreadsheet");

// PROJECT IMPORTS
const creds = require("./client_secret.json");
const config = require("./config.json");
const constants = require("./constants");
const draft = require("./drafting-utils");

const client = new Discord.Client();

// Using battlefy api endpoint
const tournamentApi = axios.create({
  baseURL: "https://dtmwra1jsgyb0.cloudfront.net/"
});

let isActive = false;

// Poll twitch stream every minute
// client.on("ready", function() {
//   client.setInterval(longPoll, 60000);
// });

client.on("message", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(constants.PREFIX)) return;

  const commandBody = message.content.slice(constants.PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  let resp, selector;

  // Command handler
  switch (command) {
    case "avg-invite":
      message.channel.send("https://discord.gg/q33MTAVdke");
      break;
    // case "fa":
    //   if (args[0] === undefined) {
    //     return;
    //   }
    //   let faverb = args[0].toLowerCase();
    //   if (["join", "leave"].includes(faverb)) {
    //     let role = message.guild.roles.cache.find(r => r.name === "Free Agent");
    //     let member = message.member;
    //     if (faverb === "join") {
    //       member.roles.add(role);
    //     } else {
    //       member.roles.remove(role);
    //     }
    //   }
    //   break;
    case "ff":
      message.channel.send(constants.HELP_MSG);
      break;
    case "mh":
      resp = "";
      if (args[0] === undefined) {
        return;
      }
      selector = args[0];
      if (Object.keys(constants.TEAM_MAP).includes(selector)) {
        let translated = constants.TEAM_MAP[selector];
        let res = await getTournamentStageMatches("5fb86cf65caa4f5e4bc861fd");
        resp +=
          "Pulling match history for " +
          translated +
          " : \n" +
          "##################################### \n";
        resp +=
          "W: " +
          res[translated][0].length +
          " L: " +
          res[translated][1].length +
          "\n";
        for (let i = 0; i < res[translated][0].length; i++) {
          resp += res[translated][0][i] + " **Win** \n";
        }
        resp += "------------------------------------- \n";
        for (let i = 0; i < res[translated][1].length; i++) {
          resp += res[translated][1][i] + " **Loss** \n";
        }
      } else {
        resp = "Not a valid argument. Format is as follows: !mh [TEAM]. ";
      }
      message.channel.send(resp);
      break;
    case "dl":
      if (args.length <= 1) {
        return;
      }
      let team1 = args[0];
      let team2 = args[1];
      let blueBanCount = (args[2] ? args[2] : 5);
      let redBanCount = (args[3] ? args[3] : 5);

      resp = await draft.generateDraft(team1, team2, blueBanCount, redBanCount);
      message.channel.send(resp);
      break;
    case "league-rules":
      message.channel.send("Rules: " + constants.RULES);
      break;
    case "league-signup":
      message.channel.send("Players: " + constants.SIGNUPS.PLAYER);
      message.channel.send("Captains: " + constants.SIGNUPS.CAPTAIN);
      break;
    case "pr":
      resp = "";
      if (args[0] === undefined) {
        return;
      }
      selector = args[0].toUpperCase();
      if (constants.VALID_ROLES.includes(selector)) {
        const res = await accessPlayerSpreadSheet();
        selector = constants.ROLE_MAP[args[0].toUpperCase()];
        // console.log(selector)
        switch (selector) {
          case "ALL":
            resp +=
              "Pulling top 10 power rankings: " +
              "\n" +
              "#####################################";
            for (let i = 1; i < 11; i++) {
              let idx = i.toString();
              let role =
                res[idx][2].charAt(0).toUpperCase() +
                res[idx][2].toLowerCase().slice(1);
              resp +=
                "\n" +
                idx +
                " : " +
                res[idx][0] +
                " (" +
                role +
                ") " +
                " (" +
                res[idx][1] +
                ") ";
            }
            break;
          default:
            let curr = 1;
            resp += "Pulling top 5 players in " + selector + "\n";
            let filtered = Object.keys(res).reduce(function(filtered, key) {
              if (res[key][2] === selector) {
                filtered[curr] = res[key];
                curr += 1;
              }
              return filtered;
            }, {});
            for (let i = 1; i < 6; i++) {
              let idx = i.toString();
              let role =
                selector.charAt(0).toUpperCase() +
                selector.toLowerCase().slice(1);
              let name =
                filtered[idx][0].charAt(0).toUpperCase() +
                filtered[idx][0].slice(1);
              resp += "\n" + idx + " : " + name + " (" + role + ") ";
            }
            break;
        }
      } else if (selector === "TEAM" || selector === "TEAMS") {
        if (args.length > 2) {
          resp =
            "Not a valid argument. Format is as follows: !pr [ALL or POSITION]. ";
        } else if (args.length === 2) {
          if (
            args[1] === "avg" ||
            args[1] === "average" ||
            args[1] === "per-player"
          ) {
            const res = await accessTeamSpreadSheet("avg");
            resp += "Pulling teams based on average player score:\n";
            for (let i = 1; i < 11; i++) {
              let idx = i.toString();
              resp +=
                "\n" +
                idx +
                " : " +
                constants.TEAM_MAP[res[idx][0]] +
                " (" +
                Number.parseFloat(res[idx][1]).toFixed(1) +
                " / Player)";
            }
          } else {
            resp =
              "Not a valid argument. Format is as follows: !pr [ALL or POSITION]. ";
          }
        } else {
          const res = await accessTeamSpreadSheet("sum");
          resp += "Pulling teams based on sum of player score:\n";
          for (let i = 1; i < 11; i++) {
            let idx = i.toString();
            resp +=
              "\n" +
              idx +
              " : " +
              constants.TEAM_MAP[res[idx][0]] +
              " (" +
              Number.parseFloat(res[idx][1]).toFixed(1) +
              ")";
          }
        }
      } else {
        resp =
          "Not a valid argument. Format is as follows: !pr [ALL or POSITION or TEAM]. ";
      }
      message.channel.send(resp);
      break;
    // case "pullstream":
    //   const loc = client.channels.cache.get("772345686158082068");

    //   axios.defaults.headers.common["Client-ID"] = config.TWITCH_ID;
    //   axios.defaults.headers.common["Authorization"] = config.TWITCH_OAUTH;

    //   axios
    //     .get(
    //       "https://api.twitch.tv/helix/search/channels?query=avidgamingesports"
    //     )
    //     .then(response => {
    //       currStream = response.data.data[0];
    //       const linkEmbed = new Discord.MessageEmbed()
    //         .setColor("#0099ff")
    //         .setTitle(currStream.title)
    //         .setURL(constants.TW_URL)
    //         .setAuthor("avidgamingesports", constants.TW_IMG1, constants.TW_URL)
    //         .setThumbnail(constants.TW_IMG2)
    //         .setTimestamp();
    //       loc.send("AvidGamingEsports is now live! " + `@everyone`);
    //       loc.send(linkEmbed);
    //     })
    //     .catch(_error => {
    //       console.log("Failed to fetch Twitch API.");
    //     });
    //   break;
    case "quote":
      let quote =
        constants.QUOTE_LIST[
          Math.floor(Math.random() * constants.QUOTE_LIST.length)
        ];
      message.channel.send(quote);
      break;
    case "standings":
      let res = await getTournamentStageMatches("5fb86cf65caa4f5e4bc861fd");
      let sorted = Object.keys(res).map(function(key) {
        return [key, [res[key][0].length, res[key][1].length]];
      });
      console.log(sorted);
      // First = Wins, Second = Losses
      // Sort first based on wins, second on who has lost more
      sorted.sort(function(first, second) {
        if (first[1][0] === second[1][0]) {
          return first[1][1] - second[1][1];
        } else {
          return second[1][0] - first[1][0];
        }
      });
      console.log(sorted);
      let standings = "Here are the current standings: \n \n";
      for (item in sorted) {
        standings +=
          "*" +
          (parseInt(item) + 1).toString() +
          ": " +
          sorted[item][0] +
          "* (W: " +
          sorted[item][1][0] +
          " L: " +
          sorted[item][1][1] +
          ")\n";
      }
      message.channel.send(standings);
      break;
    default:
      // message.channel.send("Not a valid command. Type !ff for help. ");
      break;
  }
});

client.on("guildMemberAdd", guildMember => {
  console.log("Member added. Attempting to search role");
  var role = guildMember.guild.roles.cache.find(role => role.name === "Member");
  guildMember.roles.add(role);
  console.log("Added role");
});

client.login(config.BOT_TOKEN);

async function accessPlayerSpreadSheet() {
  const doc = new GoogleSpreadsheet(
    "1oiKPuIbBt1_4U8IC0jIKz9_IMl4V5_PAqA_jrhdAsuo"
  );
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key
  });
  await doc.loadInfo();

  const sheet = doc.sheetsById[1076286390];
  const rows = await sheet.getRows({
    offset: 4,
    limit: 100
  });

  res = {};

  rows.forEach(row => {
    let raws = row._rawData;
    res[raws[5]] = [raws[1], raws[2], raws[3]];
  });
  return res;
}

async function accessTeamSpreadSheet(type) {
  const doc = new GoogleSpreadsheet(
    "1oiKPuIbBt1_4U8IC0jIKz9_IMl4V5_PAqA_jrhdAsuo"
  );
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key
  });
  await doc.loadInfo();

  const sheet = doc.sheetsById[1064544130];
  const rows = await sheet.getRows({
    offset: 4,
    limit: 10
  });

  res = {};

  if (type === "sum") {
    rows.forEach(row => {
      let raws = row._rawData;
      res[raws[5]] = [raws[6], raws[7]];
    });
  } else {
    rows.forEach(row => {
      let raws = row._rawData;
      res[raws[9]] = [raws[10], raws[11]];
    });
  }
  return res;
}

function longPoll() {
  const loc = client.channels.cache.get("772345686158082068");

  axios.defaults.headers.common["Client-ID"] = config.TWITCH_ID;
  axios.defaults.headers.common["Authorization"] = config.TWITCH_OAUTH;

  axios
    .get("https://api.twitch.tv/helix/search/channels?query=avidgamingesports")
    .then(response => {
      if (!isActive) {
        currStream = response.data.data[0];
        if (currStream.is_live) {
          const linkEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(currStream.title)
            .setURL(constants.TW_URL)
            .setAuthor("avidgamingesports", constants.TW_IMG1, constants.TW_URL)
            .setThumbnail(constants.TW_IMG2)
            .setTimestamp();
          loc.send("AvidGamingEsports is now live! " + `@everyone`);
          loc.send(linkEmbed);
        }
      }
      isActive = response.data.data[0].is_live;
    })
    .catch(_error => {
      console.log("Failed to fetch Twitch API.");
    });
}

async function getTournamentStageMatches(stage) {
  const response = await tournamentApi.get(`stages/${stage}/matches`);
  let teams = {
    "Rubber Ducky Team": [[], []],
    "Luck of the Draw": [[], []],
    "ULTIMATE DAN": [[], []],
    "On the Spot": [[], []],
    "Mailbox's Angels": [[], []],
    "BaeDCarry Fan Club": [[], []],
    "Natural Big Boys Club": [[], []],
    "Frank n' Beans": [[], []],
    "LAMAR JACKSON FAN CLUB": [[], []],
    "Big Shmeat Gang": [[], []]
  };
  for (match in response.data) {
    var winner;
    if (response.data[match].top.winner === true) {
      winner = "top";
      teams[response.data[match].top.team.name][0].push(
        response.data[match].bottom.team.name
      );
      teams[response.data[match].bottom.team.name][1].push(
        response.data[match].top.team.name
      );
    } else if (response.data[match].top.winner === false) {
      winner = "bottom";
      teams[response.data[match].top.team.name][1].push(
        response.data[match].bottom.team.name
      );
      teams[response.data[match].bottom.team.name][0].push(
        response.data[match].top.team.name
      );
    } else {
      winner = "undefined";
    }
    response.data[match].winner = winner;
  }
  return teams;
}
