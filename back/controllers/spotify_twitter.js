const needle = require("needle");
require("dotenv").config();

stopwords = [
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
  "https",
  "@",
  "RT",
  "rt",
];
const remove_stopwords = (str) => {
  res = [];
  words = str.split(" ");
  console.log(words, "words huh...");
  for (i = 0; i < words.length; i++) {
    word_clean = words[i].split(".").join("");
    if (
      !stopwords.includes(word_clean) &&
      !word_clean.includes("@") &&
      !word_clean.includes("http")
    ) {
      res.push(word_clean);
    }
  }
  return res.join(" ");
};

const bearerToken = process.env.bearerToken;
var SpotifyWebApi = require("spotify-web-api-node");
const wordsFrequency = require("words-frequency");
scopes = [
  "user-read-private",
  "user-read-email",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
];
var express = require("express");
var Router = express.Router();

var client_id = process.env.client_id;
var redirect_uri = process.env.redirect_uri;
var client_secret = process.env.client_secret;

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

const getUserTweets = async (userId) => {
  let userTweets = [];
  const url = `https://api.twitter.com/2/users/${userId}/tweets`;

  // we request the author_id expansion so that we can print out the user name later
  let params = {
    max_results: 100,
    "tweet.fields": "created_at",
    expansions: "author_id",
  };

  const options = {
    headers: {
      "User-Agent": "v2UserTweetsJS",
      authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  let userName;
  console.log("Retrieving Tweets...");

  while (hasNextPage) {
    let resp = await getPage(params, options, nextToken, url);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      userName = resp.includes.users[0].username;
      if (resp.data) {
        userTweets.push.apply(userTweets, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  console.log(
    `Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`
  );
  return userTweets;
};

const getPage = async (params, options, nextToken, url) => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

const getUserId = async (handle) => {
  const options = {
    headers: {
      authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${handle}`;
  const resp = await needle("get", url, options);

  return resp.body;
};

//here with the reqeust variable we'd send the user id ideally...
Router.get("/getData/:handle", async (request, response) => {
  const userName = String(request.params.handle);

  try {
    const userData = await getUserId(userName);

    const data = await getUserTweets(userData.id_str);

    const tweetData = data.map((tweet) => tweet.text);
    const allTweetsString = tweetData.join(" ");
    console.log(allTweetsString);
    //here is a good place to remove stop words...
    const allTweetsNoStopWords = remove_stopwords(allTweetsString);
    const groupOfSentences = wordsFrequency(allTweetsNoStopWords);

    const sortable = Object.fromEntries(
      Object.entries(groupOfSentences.data).sort(([, a], [, b]) => a - b)
    );

    console.log(sortable);

    sortedArr = Object.keys(sortable);
    const mostTweetedWords = sortedArr.slice(
      sortedArr.length - 10,
      sortedArr.length
    );
    console.log(mostTweetedWords);
    //sortedArr, is not actually sotred well....keysSortedTrunc might be but i kinda doubt it,,, remove stop words then go from there...should be an easy task tbh....just look at data and do it....

    let resArr = [];
    mostTweetedWords.forEach((element) => {
      resArr.push(spotifyApi.searchTracks(`track:${element}`));
    });
    Promise.all(resArr).then((data) => response.json([userData, data]));
  } catch (error) {
    console.log("oops, you have an errror", error);
    response.status(400).send(error);
  }
});

//spotify auth stuff etc

Router.get("/login", (req, res) => {
  var html = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(html + "&show_dialog=true");
});

Router.get("/callback", async (req, res) => {
  const { code } = req.query;
  try {
    var data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.cookie("token", access_token);
    //set a cookie! -invalidate the cookie after a bit....3600 seconds to match the spotify token...use mongo for this maybe!

    //was this before prod http://localhost:3000/#success, prod: https://spotitter.herokuapp.com/#success
    res.redirect("https://tranquil-cassata-192890.netlify.app/#success");
  } catch (err) {
    //http://localhost:3000/ was this before prod, prod: https://spotitter.herokuapp.com/
    res.redirect("https://tranquil-cassata-192890.netlify.app/");
  }
});

module.exports = Router;
