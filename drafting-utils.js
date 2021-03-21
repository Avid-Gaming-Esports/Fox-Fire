const puppeteer = require("puppeteer");

// Delay Function
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Generates a draft and
 * @param {string} team1 : Team 1 name
 * @param {string} team2 : Team 2 name
 * @param {string} matchName : Name of the match ({team1} VS {team2})
 *
 * @returns {string} The match data generated (for use in discord)
 */
async function generateDraft(team1, team2, matchName) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("http://prodraft.leagueoflegends.com/");
  await page.type("#blue_team_name", team1);
  await page.type("#red_team_name", team2);
  await page.type("#match_name", matchName);
  await page.click("#root > div > div > button");
  await delay(1000);

  let blue = await page.$("#blue_team_name");
  let red = await page.$("#red_team_name");
  let match = await page.$("#match_name");

  let blueTeam = await page.evaluate((el) => el.value, blue);
  let redTeam = await page.evaluate((el) => el.value, red);
  let matchTeam = await page.evaluate((el) => el.value, match);
  browser.close();

  return `${team1}: ${blueTeam}\n ${team2}: ${redTeam}\n Spec: ${matchTeam}`;
}

exports.generateDraft = generateDraft;
