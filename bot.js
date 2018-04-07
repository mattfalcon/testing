
// ==================ACTION ITEMS==================
// Connect to Twitter DONE
// Fetch Tweets DONE
// Create Array 
//  Randomize Array and Tweets
// Post Tweet
// Process.Env
//==================================================

//=================API KEYS ========================

//=================REQUIREMENTS======================

var Twitter = require('twitter');
var fs = require('fs');


//==================API KEYS ==========================
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
   
// Tweet Options 
var all_tweets = [];
var historic_tweets = [];
var otherArray = [ 
    "If it doesn't challenge you, It won't change you",
    "Persist Until Success Happens #Push",
    "#TrainWithHeart",
    "Rise Run Rest Repeat",
    "Never Stop Running",
    "You are your own limit 00:00:00",
    "Believe in the Run",
    "I'd rather be running",
    "Are we running today?",
    "Running is cheaper than Therapy",
    "Your only limit is you",
    "Don't Dream of Running, Train for it",
    "No rules, just run",
    "Embrace the mud, the dirt, the GRIT",
    "Every Damn Day",
    "There is no 'Y' in running",
    "Be Legendary",
    "Willpower Knows No Obstacles",
    "Start Unknown Finish Unforgettable",
    "Greatness has no peak",
    "My sport is your sport's punishment",
    "Life is a sport, make it count",
    "No rules Just run",
    "Don't Quit",
    "Run to be fierce",
    "Yesterday you said tomorrow"
    ]

//function to choose random array 
function chooseRandom(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];  
}

//random array
var phrase = chooseRandom(otherArray)

var tweetSandler = function () {
//====================QUERY =========================================
  var params = {q: 'uiltrack' || 'trackandfield' || 'trackmeet' || 'running', count: 50};
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);

  //loop through all tweets possible
  for (tweet in tweets.statuses) {
    //add the tweet to our all_tweets list
    all_tweets.push({
      "text": tweets.statuses[tweet].text,
      "id": tweets.statuses[tweet].id,
      "name": tweets.statuses[tweet].user.name,
      "screen_name": tweets.statuses[tweet].user.screen_name,
      "location": tweets.statuses[tweet].user.location,
      "url": tweets.statuses[tweet].user.url
    });

}
//================RANDOMIZED ===========================================
 
//create random element
  random_element = Math.floor(Math.random() * all_tweets.length) + 1;

 // choose a random tweet
  selected_tweet = all_tweets[random_element];

  if (!(selected_tweet in historic_tweets)) {
      //Push the selected tweet in historic tweets
      historic_tweets.push(selected_tweet);
      console.log("Yo " + selected_tweet.screen_name);
  }
      


  //============POST TWEET ===========================================
  //Test case for tweeting out 
  client.post('statuses/update', {status: "RT @" + selected_tweet.screen_name + " " + selected_tweet.text + " " + phrase + " FOLLOW @Stop_Pre"}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
    }); 


//====================FS WRITE ==============================================
      fs.writeFile("contents.json", JSON.stringify(all_tweets, null, '\t'), (err) => {
          if(err) throw err;
          console.log('It\s saved!');
      })
    }
});
}

tweetSandler();
setInterval(tweetSandler, 2700000)
