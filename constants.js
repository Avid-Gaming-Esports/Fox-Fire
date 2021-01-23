const VALID_ROLES = ["TOP", "TOPLANER", "JUNGLE", "JG", "JUNGLER",
	"MID", "MIDDLE", "MIDLANE", "MIDLANER", "BOTTOM", "BOT", "ADC",
	"AD CARRY", "ADC", "SUPPORT", "SUPP", "ALL", "EVERYTHING"]

const TEAM_MAP = {
	"LotD": "Luck of the Draw",
	"NBBC": "Natural Big Boys Club",
	"RDT": "Rubber Ducky Team",
	"LJFC": "LAMAR JACKSON FAN CLUB",
	"BSG": "Big Shmeat Gang", 
	"BCFC": "BaeDCarry Fan Club", 
	"MA": "Mailbox's Angels",
	"OTS": "On the Spot", 
	"UD": "ULTIMATE DAN",
	"FNB": "Frank n' Beans",
	"Luck of the Draw": "Luck of the Draw",
	"Natural Big Boys Club": "Natural Big Boys Club",
	"Rubber Ducky Team": "Rubber Ducky Team",
	"LAMAR JACKSON FAN CLUB": "LAMAR JACKSON FAN CLUB",
	"Big Shmeat Gang": "Big Shmeat Gang", 
	"BaeDCarry Fan Club": "BaeDCarry Fan Club", 
	"Mailbox's Angels": "Mailbox's Angels",
	"On the Spot": "On the Spot", 
	"ULTIMATE DAN": "ULTIMATE DAN",
	"Frank n' Beans": "Frank n' Beans"
}

const ROLE_MAP = {
	"TOP": "TOP",
	"TOPLANER": "TOP",
	"JUNGLE": "JUNGLE",
	"JG": "JUNGLE",
	"JUNGLER": "JUNGLE",
	"MID": "MIDDLE",
	"MIDDLE": "MIDDLE",
	"MIDLANE": "MIDDLE",
	"MIDLANER": "MIDDLE",
	"BOTTOM": "BOTTOM",
	"BOT": "BOTTOM",
	"ADC": "BOTTOM",
	"AD CARRY": "BOTTOM",
	"ADC": "BOTTOM",
	"SUPPORT": "SUPPORT",
	"SUPP": "SUPPORT",
	"ALL": "ALL",
	"EVERYTHING": "ALL"
}

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

const HELP_MSG = "The following commands are available: \n \n" + 
"*!autoassign*: Not implemented yet. \n" + 
"*!fa [leave, join]*: Controls admission to Free Agent group. \n" + 
"*!ff*: Displays this help message. \n" + 
"*!mh*: Displays a team's match history. \n" + 
"*!pr [position, all, team]*: Returns powerranking for AVG's League Tournament. \n" +
"*!quote*: Returns a random Ahri quote. \n" + 
"*!standings*: Returns team standings for AVG's League Tournament. \n \n" + 
"Fox-Fire is developed and maintained by our Dev team. \n" + 
"See the code here: https://github.com/avidgaming/Fox-Fire";

const PREFIX = "!";

const TW_IMG1 = "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:" +
	"best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg";
const TW_IMG2 = "https://blog.twitch.tv/assets/uploads/03-glitch.jpg";
const TW_URL = "https://www.twitch.tv/avidgamingesports";

module.exports = Object.freeze({
	VALID_ROLES: VALID_ROLES,
	ROLE_MAP: ROLE_MAP,
	QUOTE_LIST: QUOTE_LIST,
	PREFIX: PREFIX,
	HELP_MSG: HELP_MSG,
	TEAM_MAP: TEAM_MAP,
	TW_IMG1: TW_IMG1,
	TW_IMG2: TW_IMG2,
	TW_URL: TW_URL
});