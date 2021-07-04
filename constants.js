const VALID_ROLES = [
  "TOP",
  "TOPLANER",
  "JUNGLE",
  "JG",
  "JUNGLER",
  "MID",
  "MIDDLE",
  "MIDLANE",
  "MIDLANER",
  "BOTTOM",
  "BOT",
  "ADC",
  "AD CARRY",
  "ADC",
  "SUPPORT",
  "SUPP",
  "ALL",
  "EVERYTHING",
];

const TEAM_MAP = {
  LE: "La Espada",
  RV: "Royal Vagabonds",
  INT: "Im Not Trying",
  UPS: "United Parcel Service",
  DBZ: "DaBabieZ",
  BFC: "BaeDcarry Fan Club",
  TI: "Third Impact",
  IGN: "Ignition",
  OTS: "On The Spot",
  HOT: "Hot Take",
  "La Espada": "La Espada",
  "Royal Vagabonds": "Royal Vagabonds",
  "Im Not Trying": "Im Not Trying",
  "United Parcel Service": "United Parcel Service",
  "DaBabieZ": "DaBabieZ",
  "BaeDcarry Fan Club": "BaeDcarry Fan Club",
  "Third Impact": "Third Impact",
  "Ignition": "Ignition",
  "On The Spot": "On The Spot",
  "Hot Take": "Hot Take",
};

const TEAM_MAP_10 = {
  LE: "La Espada",
  RV: "Royal Vagabonds",
  INT: "Im Not Trying",
  UPS: "United Parcel Service",
  DBZ: "DaBabieZ",
  BFC: "BaeDcarry Fan Club",
  TI: "Third Impact",
  IGN: "Ignition",
  OTS: "On The Spot",
  HOT: "Hot Take",
};

const ROLE_MAP = {
  TOP: "TOP",
  TOPLANER: "TOP",
  JUNGLE: "JUNGLE",
  JG: "JUNGLE",
  JUNGLER: "JUNGLE",
  MID: "MIDDLE",
  MIDDLE: "MIDDLE",
  MIDLANE: "MIDDLE",
  MIDLANER: "MIDDLE",
  BOTTOM: "BOTTOM",
  BOT: "BOTTOM",
  ADC: "BOTTOM",
  "AD CARRY": "BOTTOM",
  ADC: "BOTTOM",
  SUPPORT: "SUPPORT",
  SUPP: "SUPPORT",
  ALL: "ALL",
  EVERYTHING: "ALL",
};

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
];

const HELP_MSG =
  "The following commands are available: \n \n" +
  "*!autoassign*: Not implemented yet. \n" +
  "*!avg-invite*: Displays our publicly available discord invite link. \n" +
  "*!dl [team1 team2] [ban1 ban2]: Returns draftlol link for specified teams/bans. \n" +
  "*!fa [leave, join]*: Controls admission to Free Agent group. \n" +
  "*!ff*: Displays this help message. \n" +
  "*!mh*: Displays a team's match history. \n" +
  "*!pr [position, all, team]*: Returns powerranking for AVG's League Tournament. \n" +
  "*!quote*: Returns a random Ahri quote. \n" +
  "*!standings*: Returns team standings for AVG's League Tournament. \n \n" +
  "Fox-Fire is developed and maintained by our Dev team. \n" +
  "See the code here: https://github.com/avidgaming/Fox-Fire";

const PREFIX = "!";

const TW_IMG1 =
  "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:" +
  "best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg";
const TW_IMG2 = "https://blog.twitch.tv/assets/uploads/03-glitch.jpg";
const TW_URL = "https://www.twitch.tv/avidgamingesports";

const SIGNUPS = {
  "PLAYER": "<https://forms.gle/oofA6a4cDuMq3pkK6>",
  "CAPTAIN": "<https://forms.gle/YTYngQfK4HVqbNTq8>"
}
const RULES = "<https://avid-alpha.wl.r.appspot.com/rules/avg-season-2>"

module.exports = Object.freeze({
  VALID_ROLES: VALID_ROLES,
  ROLE_MAP: ROLE_MAP,
  QUOTE_LIST: QUOTE_LIST,
  PREFIX: PREFIX,
  HELP_MSG: HELP_MSG,
  TEAM_MAP: TEAM_MAP,
  TEAM_MAP_10: TEAM_MAP_10,
  TW_IMG1: TW_IMG1,
  TW_IMG2: TW_IMG2,
  TW_URL: TW_URL,
  SIGNUPS: SIGNUPS,
  RULES: RULES
});
