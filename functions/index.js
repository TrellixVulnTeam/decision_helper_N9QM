'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'make_decision';
// b. the parameters that are parsed from the make_name intent 
const NAME_ARGUMENT = 'given_name';
const TIME_PERIOD_ARGUMENT = 'time_period';
const COMMITMENT_ARGUMENT = 'commitment_level';
const PHYSICAL_FEELING_ARGUMENT = 'physical_feeling';
const GOALS_ARGUMENT = 'goals_aligned';
const RISKS_ARGUMENT = 'decision_risks';
const OPPOSITE_RISKS_ARGUMENT = 'opposite_risks';
const TIME_EVALUATION_ARGUMENT = 'right_time';
const PAST_EXPERIENCES_ARGUMENT = 'past_experiences';
const FUN_ARGUMENT = 'determine_fun';


exports.decisionMaker = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that evaluated decion state
  function makeDecision (app) {
    let name = app.getArgument(NAME_ARGUMENT);
    let timePeriod = app.getArgument(TIME_PERIOD_ARGUMENT);
    let commitmentLevel = app.getArgument(COMMITMENT_ARGUMENT);
    let physicalFeeling= app.getArgument(PHYSICAL_FEELING_ARGUMENT);
    let goalAlignment = app.getArgument(GOALS_ARGUMENT);
    let riskLevel = app.getArgument(RISKS_ARGUMENT);
    let reverseRisk = app.getArgument(OPPOSITE_RISKS_ARGUMENT);
    let correctTime = app.getArgument(TIME_EVALUATION_ARGUMENT);
    let pastExperience = app.getArgument(PAST_EXPERIENCES_ARGUMENT);
    let determineFun = app.getArgument(FUN_ARGUMENT);

    if(correctTime=='yes'){
        var answerTime = 'a good';
    }
    else if(correctTime=='no'){
        var answerTime = 'not a good';
    }

    console.log(timePeriod);
    app.tell('Alright '+name+','+' you have thought about this for ' + timePeriod.amount + ' ' + timePeriod.unit + '. ' +
        'On a scale of 1-10 you have rated your commitment as a ' +  commitmentLevel + '. ' +
        'You feel ' + physicalFeeling + ' about this. ' +
        'This decision is ' + goalAlignment + ' aligned with your long-term goals. ' +
        'On a scale of 1-10 you rated the risks of this decision at a ' + riskLevel + '. ' +
        'You rated the risks of not doing it a ' + reverseRisk + ' on a scale of 1-10. ' +
        'You said now is ' + answerTime + ' for this. ' +
        'You said your past experience with this is ' + pastExperience + '. ' +
        'When asked if this decision could be fun you said '+ determineFun + '!');

  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeDecision);


app.handleRequest(actionMap);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
