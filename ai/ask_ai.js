const { ChatMessageHistory } = require('langchain/stores/message/in_memory');
const { HumanMessage, AIMessage } = require('@langchain/core/messages');
const detectIntent = require('./brain_core/detect_intent');
const detectTopic = require('./brain_core/detect_topic');
const handleExplanation = require('./brain_core/handle_explanation');
const handleExercise = require('./brain_core/handle_exercise');
const handleAnswer = require('./brain_core/handle_answer');
const handleClosing = require('./brain_core/handle_closing');
const model = require('../model/model_ai');
const handleImage = require('./brain_core/handle_image');
require('dotenv').config();

// initial state
const contextState = {};


// intent state :
// ask_explanation
// start_exercise
// submit_answer
// switch_matery


// check is user asking for explanation -> process 1

// AI give a explanation -> process 1 YES
// then AI will asking to user he want continue to next material or exercise -> process 2

// if user want exercise AI will give 10 exercise -> process 2 YES
// if user got 10 score AI will ask continue or end session -> process 2 NEXT STEP
// if not AI will ask for rework, continue, or end session -> process 2 NEXT STEP

// if user do not want exercise AI will ask for the next material -> process 2 NO

// if not AI will asking to user does he want to be explained -> process 1 NO

async function askAI(userPrompt, userId, media) {

    let prompt = userPrompt

    // get context from memory
    let context = contextState[userId] || {
        currentTopic: null,
        currentIntent: null,
        lastScore: null,
        isWaitingForAnswer: false,
        memoryHistory: new ChatMessageHistory(),
    }

    // save prompt to memory
    const history = context.memoryHistory;
    await history.addMessage(new HumanMessage(prompt));
    
    if(media) {
        const information = await handleImage(media, prompt);
        prompt = information;
    }
    
    context.currentIntent = await detectIntent(prompt);
    
    const intentNeedsTopic = ['ask_explanation', 'start_exercise', 'submit_answer', 'switch_matery'];
    if (intentNeedsTopic.includes(context.currentIntent) && !context.currentTopic) {
        context.currentTopic = await detectTopic(prompt);
    }

    let response;

    if (context.isWaitingForAnswer && intentNeedsTopic.includes(context.currentIntent)) {
        response = await handleExercise(context);
        return response;
    }

    switch (context.currentIntent) {
        case 'greeting':
            // save AI response to history
            await context.memoryHistory.addMessage(new AIMessage('Hai, mau belajar materi apa hari ini?'));
            response = 'Hai!, mau belajar materi apa hari ini?'
            break;
        case 'ask_explanation':
            response = await handleExplanation(context);
            break;
        case 'switch_matery':
            response = await handleExplanation(context);
            break;
        case 'start_exercise':
            response = await handleExercise(context);
            break;
        case 'submit_answer':
            response = await handleAnswer(context);
            break;
        case "end_session":
            // delete contextState[userId];
            response = await handleClosing(context)
            break;
        default:
            response = await model.call([new HumanMessage(prompt)]);
    }

    // save context
    contextState[userId] = context;

    return response;
}

module.exports = { askAI };