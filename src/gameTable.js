import league1 from "../data/2010-11/at.1.json" with {type: "json"};
import league2 from "../data/2010-11/at.2.json" with {type: "json"};
import league3 from "../data/2010-11/de.1.json" with {type: "json"};
import league4 from "../data/2010-11/en.1.json" with {type: "json"};
import league5 from "../data/2010-11/en.2.json" with {type: "json"};
import league6 from "../data/2010-11/en.3.json" with {type: "json"};
import league7 from "../data/2010-11/en.4.json" with {type: "json"};

const allLeagues201011 = () => [league1, league2, league3, league4, league5,
  league6, league7];

const allMatches = (league) => league.rounds.flatMap(({ matches }) => matches);

const winner = (team1, team2, [scoreTeam1, scoreTeam2]) =>
  scoreTeam1 === scoreTeam2 ? "-" :
  scoreTeam1 > scoreTeam2 ? team1 : team2;

const getMatchDetails = (matches) =>
  matches.map(({ date, team1, team2, score }) => ({
  date: date || "N/A",
  team1: team1 || "N/A",
  ft: score?.ft || [0, 0],
  team2: team2 || "N/A",
  winningTeam: winner(team1, team2, score?.ft)
}));

const leagueTable = (league) => {
  const name = league.name;
  const matches = allMatches(league);
  const allMatchesDetail = getMatchDetails(matches);
  
  return { name, matchDetail: allMatchesDetail};
};

const display = () => {
  const leagues = allLeagues201011();
  const chart = leagues.map(league => leagueTable(league));
  
  chart.forEach(({ name, matchDetail }) => {
    console.log("Game -->", name);
    console.table(matchDetail);
    console.log("\n");
  });
};

display();