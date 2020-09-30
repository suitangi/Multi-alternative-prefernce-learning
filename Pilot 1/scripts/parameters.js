window.expParam = {
  prequestions: [{
      question: "<img src=\"./img/Consent.png\"><br>",
      choices: ["<b>By clicking this button, you are indicating that you are at least 18 years old, have read and understand this consent form, and you agree to participate in this online research study.</b>"],
      type: 'choice',
      title: 'Study Information'
    }, {
      question: "Welcome to the study! Please read all the instructions carefully. Please work on a <b>laptop or desktop</b> for the study. Please <b>do not</b> exit or refresh the page while you are working on the study.",
      type: 'text',
      title: 'Welcome'
    }, {
      question: "In this task, you will play a “gambling” game involving four different options. On each trial you will see two of the four options, represented by geometric figures. Here is an example:<br><img src='./img/screenshot.png'>",
      type: 'text',
      title: 'Welcome'
    }, {
      question: "Your task is to select the option you prefer out of the pair. You will press the \"P\" on the keyboard to select the right option and the \"Q\" on the keyboard to select the left option.<br><img src='./img/pqkeys.png'>",
      type: 'text',
      title: 'Task'
    }, {
      question: "Your aim is to collect points throughout the task. You will receive points based on your choice on each trial, which will adjust your total score either up or down. Your total score is displayed at the top right corner of the screen.<br><br><strong>Please note:</strong> The four options offer different amounts of points. The options also vary in the range of possible points they provide. In each pair, there is always one option that provides a wider range of possible points than the other option. It is also possible to receive negative points, which subtract from your total score. You have 10 seconds to make your choice, and the bottom red bar indicates how much time you have left.",
      type: 'text',
      title: 'Instructions'
    }, {
      question: "At the start of the task, you won’t know the range of possible points that the options provide. You will have the opportunity to learn this over the trials. After you make a choice, you will see the points you earned plus the points you could have earned from the other option that you didn’t select.",
      type: 'text',
      title: 'Instructions'
    }, {
      question: "To get started, place your right index finger on the \"P\" key and your left index finger on the \"Q\" key. Press either key to begin.",
      type: 'specialKey',
      title: 'Instructions'
    }

    //    }, {
    //      question: "Multiple choice question",
    //      choices: ["Choice 1", "Choice 2"]
    //    }, {
    //      question: "Make last choice 'other' to get open ended other choice",
    //      choices: ["Choice 1", "Choice 2", "other"]
    //    }
  ],
  postquestions: [ {
    question: "You have now finished all of the decision problems. The total number of points you earned is<br>" + window.pointTotal + "<br>You will now be asked to complete a few questions about yourself.<br>Thank you for your continued participation.",
    type: 'text',
    title: 'Thank You'
  }, {
    question: "What is your age?",
    placeholder: " ",
    type: 'number',
    min: 18,
    max: 99,
    title: 'Age'
  }, {
    question: "What is your gender?",
    choices: ["Male", "Female", "Other"],
    type: 'choice',
    title: 'Gender'
  }, {
    question: "What is your highest level of education?",
    choices: ["Less than high school", "High school graduate", "Some college", "2 year degree", "4 year degree", "Professional Degree", "Doctorate"],
    type: 'choice',
    title: 'Education'
  }, {
    question: "What is your total pretax household income (in the past year)?",
    choices: ["Less than $10,000", "$10,000 - $19,999", "$20,000 - $29,999", "$30,000 - $39,999", "$40,000 - $49,999", "$50,000 - $59,999", "$60,000 - $69,999", "$70,000 - $79,999", "$80,000 - $89,999", "$90,000 - $99,999", "$100,000 - $124,999", "$125,000 - $149,999", "$150,000 - $199,999"],
    type: 'choice',
    title: 'Income'
  }, {
    question: "What is your current employment status?",
    choices: ["Employed", "Self-employed", "Unemployed looking for work", "Unemployed not looking for work", "Retired", "Other"],
    type: 'choice',
    title: 'Employment Status'
  }, {
    question: "If unemployed, how long have you been unemployed for?",
    choices: ["Less than one week", "Between one week and two weeks", "Between two weeks and three weeks", "Between one month and two months", "Between two months and three months", "Between three months and six months", "Between six months and one year", "More than one year", "I am currently employed"],
    type: 'choice',
    title: 'Employment Status'
  }, {
    question: "How financially constrained do you feel? (On a scale of 1 to 7)",
    choices: ["1 Not at all financially constrained", "2", "3", "4", "5", "6", "7 Very financially constrained"],
    type: 'choice',
    title: 'Finacial Contraint'
  }],
  confirm_popup: {
    title: "Submission Complete!",
    content: "Thank you for completing the experiment!<br><br><br>Your confirmation code is: <strong>7y3Wef</strong><br><br><br>Please return to the Mechanical Turk page and enter your code.<br><br><br>You need to go back to the original Mechanical Turk HIT for this step."
  },

  choices: 2,
  options: [{
      img_src: "./img/choiceA.png",
      name: "A",
      value: function() {
        return 3;
      },
      read: "3"
    },
    {
      img_src: "./img/choiceB.png",
      name: "B",
      value: function() {
        return normal(3, 3, -6, 12);
      },
      read: "normal(3, 3) [-6:12]"
    },
    {
      img_src: "./img/choiceC.png",
      name: "C",
      value: function() {
        return normal(6, 6, -12, 24);
      },
      read: "normal (6, 6) [-12:24]"
    },
    {
      img_src: "./img/choiceD.png",
      name: "D",
      value: function() {
        return normal(6, 14, -36, 48);
      },
      read: "normal (6, 14) [-36:48]"
    }
  ],
  trials: 90,
  break_trials: [30, 60],
  attention_checks: [20, 80],
  fixation_duration: [750, 1250],
  feedback_duration: 3000,
  choice_duration: 10000

}
