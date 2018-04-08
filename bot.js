
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

var client = new Twitter({
    consumer_key: '3nHvdPzCLidgi0d0g8AJSQFpZ',
    consumer_secret: 'mfYAcJIYBMcSlZGcsYJxqySCWtiBYfvd9YE9EWUbVVRRylh3kP',
    access_token_key: '981694814445101056-etmMNN9n9M0s6fU9Dn6vtQrnicCxfW7',
    access_token_secret: 'mdb6WLuOVDDJhOPhl2Fl4dpH6gb2FvNkSGwfz5IeVhzNf'
  });


// // //==================API KEYS ==========================
// var client = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//   });
   

// Tweet Options 
var all_tweets = [];
var historic_tweets = [];




var tweetSandler = function () {
    var otherArray = [ 
        "If it doesn't challenge you, It won't change you",
        "Persist Until Success Happens #Push",
        "#TrainWithHeart",
        "Rise Run Rest Repeat",
        "Never Stop Running",
        "You are your own limit 00:00:00",
        "Wake up, Workout",
        "You miss 100% of the shots you dont take",
        "Clear your mind of can't",
        "Remember everything you need is already inside of you",
        "Ever tried. Ever failed. No Matter. Try again. Fail again. Fail better",
        "Only those who risk going too far, can possibly find out how far one can go.",
        "The voice inside your head that says you can’t do this is a liar",
        "You can throw in the towel, or you can use it to wipe the sweat off of your face",
        "Success isn't given it's earned",
        "Don't let fatigue make a coward out of you",
        "Write the Future",
        "Victory is paid for in sweat",
        "Earned not Given",
        "If no one thinks you can, Then You Have To",
        "There is no finish line",
        "Unleash The Beast",
        "#MakeItCount",
        "Walk to the stadium, Sprint to the finish",
        "Nearly isn't Enough",
        "Don't dream of winning, Train for it",
        "Remain the fastest, Become the Greatest",
        "Find Your Greatness",
        "Run Further, Run Faster, Run Together",
        "#BetterForIt",
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
    
    var searchQuery = [
        'trackandfield',
        'trackmeet',
        'uiltrack',
        'fartleks',
        'discus',
        'shot put',
        'pole vault',
        'highjump',
        'longjump',
        'triplejump',
        '3200m',
        '400m relay',
        '800m run',
        '100m hurdles',
        '110m hurdles',
        '100m dash',
        '800m relay',
        '4x100 relay',
        '4x800 relay',
        '4x400 relay',
        'distance medley',
        '300m hurdles',
        '200m dash',
        '1600m run',
        '1600m relay',
        '26.2 miles',
        '3000 meter steeplechase',
        '1500 meters',
        '10,000 meters',
        '5000 meters',
        'javelin throw'
    ]
    
    function randomquery(search) {
        return search[Math.floor(Math.random() * search.length)];
    }
    
    var myquery = randomquery(searchQuery)

    console.log(myquery);

//====================QUERY =========================================
  var params = {q: myquery, count: 100};
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
  client.post('statuses/update', {status: "RT @" + selected_tweet.screen_name + " " + selected_tweet.text + " ," + selected_tweet.location + " - " + phrase + " -FUELED BY TRACKNERD @Stop_Pre"}, function(error, tweet, response) {
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
// setInterval(tweetSandler, 1800000)