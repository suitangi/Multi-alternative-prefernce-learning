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
      question: "In this experiment, you will complete several simple counting tasks. Each task consists of counting the number of objects of a specific type  (either circles or squares) on the screen. For example, in the task below, there are many circles and squares on the screen. Your job is to count the number of circles and enter that number. Here is an example:<br><img src='./img/screenshot.png'>",
      type: 'text',
      title: 'Welcome'
    }, {
      question: "Each trial is made up of 1 or more tasks for you to complete. At the start of each trial, you will be informed of the type of object that you will count and the number of tasks you will complete on the trial, as shown below. <br><img src='./img/pqkeys.png'>",
      type: 'text',
      title: 'Instructions'
    }, {
      question: "After you complete all of the tasks on a trial, you will report how much you enjoyed the tasks by using the seven-point scale as shown below. <br><img src='./img/7point.png'>",
      type: 'text',
      title: 'Instructions'
    }, {
      question: "You will receive feedback about your performance on the trial after you provide your rating of enjoyment.<br><br>You will earn 5 points if you correctly count the number of objects on all tasks within a trial. If you make a mistake on any of the tasks within a trial, you will earn 0 point.<br><br>After you complete the experiment, you can earn bonus payment on top of the $1 base payment. The amount of bonus will be determined by the total amount of points you earn throughout the entire experiment as presented below:<br><br>495~550 points: $0.10<br>551~625 points: $0.25<br>626~660 points: $0.50",
      type: 'text',
      title: 'Instructions'
    }, {
      question: "There are total 4 blocks of 33 trials for you to complete.<br><br>To begin, you will go through two practice trials. Your performance in the practice trials will not affect your total points.",
      type: 'text',
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
    content: "Thank you for completing the experiment!<br><br><br>Your confirmation code is: <strong></strong><br><br><br>Please return to the Mechanical Turk page and enter your code.<br><br><br>You need to go back to the original Mechanical Turk HIT for this step."
  },

  blocks: 16,
  trials: 90,
  break_trials: [30, 60],
  attention_checks: [20, 80],
  fixation_duration: [750, 1250],
  feedback_duration: 3000,
  choice_duration: 10000

}
