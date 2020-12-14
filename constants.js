const VALID_ROLES = ["TOP", "TOPLANER", "JUNGLE", "JG", "JUNGLER",
	"MID", "MIDDLE", "MIDLANE", "MIDLANER", "BOTTOM", "BOT", "ADC",
	"AD CARRY", "ADC", "SUPPORT", "SUPP", "ALL", "EVERYTHING"]

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
"*!ff*: Displays this help message. \n" + 
"*!powerrank*: Returns powerranking for AVG's League Tournament. \n" +
"*!quote*: Returns a random Ahri quote. \n" + 
"*!standings*: Returns team standings for AVG's League Tournament. \n \n" + 
"Fox-Fire is developed and maintained by our Dev team. \n" + 
"See the code here: https://github.com/avidgaming/Fox-Fire";

const PREFIX = "!";

module.exports = Object.freeze({
	VALID_ROLES: VALID_ROLES,
	ROLE_MAP: ROLE_MAP,
	QUOTE_LIST: QUOTE_LIST,
	PREFIX: PREFIX,
	HELP_MSG: HELP_MSG
});