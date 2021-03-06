//Helper: html string to node
function createHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

//Helper: shuffle an array
function shuffle(array) {
  for (var i = array.length - 1; i > 0; --i) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Helper: check if 2 arrays are the same
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

//Helper: check if any element is repeated more than n times in an ordered array
function arrayRepeatCheck(arr, n) {
  let repeated = 0;
  for (var i = 0; i < arr.length - 1; i++) {
    if (arraysEqual(arr[i], arr[i + 1])) {
      repeated += 1;
      if (repeated > n) return true;
    } else {
      repeated = 0;
    }
  }
  return false;
}

//Helper: Better rounding
function roundBetter(num, place) {
  let mod = Math.pow(10, place);
  return Math.round(num * mod + Math.sign(num) * 0.1 ** (17 - 2 - (Math.round(num * mod) / mod).toString().length)) / mod;
}

//function to save json data
function saveData(filename, deletename, filedata) {
  $.ajax({
    type: 'post',
    cache: false,
    url: './save_data_final.php', // this is the path to the PHP script
    data: {
      filename: filename,
      filedata: filedata,
      deletename: deletename
    },
    success: function(msg) {
      window.expData.expDone = true;
      let expCookie = {};
      expCookie.unid = window.unID;
      expCookie.expData = window.expData;
      expCookie.trialTimeline = window.trialTimeline;
      expCookie.trialNumber = window.trialNumber;
      expCookie.pointTotal = window.pointTotal;
      Cookies.set('exp', JSON.stringify(expCookie), {
        expires: 7
      });
      $.confirm({
        title: window.expParam.confirm_popup.title,
        content: window.expParam.confirm_popup.content,
        type: 'blue',
        boxWidth: '55%',
        useBootstrap: false,
        typeAnimated: true,
        buttons: {
          close: {
            text: "Close",
            btnClass: 'btn-blue',
            action: function() {
              return false;
            }
          }
        },
        onOpenBefore: function() {
          // before the modal is displayed.
          this.buttons.close.hide();
        },
      });
    },
    error: function(jqXhr, textStatus, errorThrown) {
      alert('An error has occurred. Press ok to try submitting again.\nError code: ' + errorThrown);
      saveData(filename, deletename, filedata);
      console.log(errorThrown);
    }

  });
}

//function partial save
function partialSave(filename, filedata) {
  $.ajax({
    type: 'post',
    cache: false,
    url: './save_data.php', // this is the path to the PHP script
    data: {
      filename: filename,
      filedata: filedata
    },
    success: function(msg) {
      console.log('Partial Data saved');
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

//function to convert data to csv
function dataToCSV() {
  let i, j,
    csv = '';
  csv += 'Unique ID,' + window.unID + '\n';
  csv += 'Total points,' + window.pointTotal + '\n';
  window.expEndTime = new Date();
  csv += 'Total time,' + (window.expData.totalTime + (window.expEndTime - window.expStartTime)) / 60000 + ' minutes\n';
  csv += 'Times reconnected,' + window.expData.timesReconnected + '\n';
  csv += 'Attention Check,Answered,Actual,Correct?\n';
  for (i = 0; i < window.expParam.attention_checks.length; i++) {
    csv += "\"" + (i + 1) + "\"";
    if (i < window.expData.attentionCheck.length) {
      csv += "," + window.expData.attentionCheck[i].answered + "," + window.expData.attentionCheck[i].correct + "," + window.expData.attentionCheck[i].accuracy;
    }
    csv += "\n";
  }
  csv += 'Prequestion,Answer\n'
  for (i = 0; i < window.expData.preQuestions.length; i++) {
    csv += "\"" + window.expData.preQuestions[i].question + '","' +
      window.expData.preQuestions[i].answer + '"\n';
  }
  csv += '\nPostquestion,Answer\n';
  if (window.expData.postQuestions.length == 0) {
    for (i = 0; i < window.expParam.postquestions.length; i++) {
      csv += '"' + window.expParam.postquestions[i].title + '",""\n';
    }
  } else {
    for (i = 0; i < window.expData.postQuestions.length; i++) {
      csv += '"' + window.expData.postQuestions[i].question + '","' +
        window.expData.postQuestions[i].answer + '"\n';
    }
  }
  csv += '\nChoices\n';
  for (i = 0; i < window.expParam.options.length; i++) {
    csv += '"' + window.expParam.options[i].name + '","' +
      window.expParam.options[i].read + '",';
    if (window.stimuliColors[i] == 0) {
      csv += '"Blue"';
    } else if (window.stimuliColors[i] == 90) {
      csv += '"Purple"';
    } else if (window.stimuliColors[i] == 180) {
      csv += '"Red"';
    } else if (window.stimuliColors[i] == 270) {
      csv += '"Green"';
    }
    csv += '\n';
  }
  csv += '\nTrial,Choice 1,Choice 2,Choice 1 Value,Choice 2 Value,Chosen,Chosen Value,Reaction Time\n'
  for (i = 0; i < window.expData.trialData.length; i++) {
    csv += window.expData.trialData[i].trialNumber + ',' +
      window.expData.trialData[i].choices[0] + ',' +
      window.expData.trialData[i].choices[1] + ',' +
      window.expData.trialData[i].choiceValues[0] + ',' +
      window.expData.trialData[i].choiceValues[1] + ',' +
      window.expData.trialData[i].chosen + ',' +
      window.expData.trialData[i].chosenVal + ',' +
      window.expData.trialData[i].reactTime + '\n';
  }
  return csv;
}


//function for other radio
function otherRadioClick() {
  document.getElementsByClassName('radioContainer')[
      document.getElementsByClassName('radioContainer').length - 1]
    .getElementsByTagName('input')[0].checked = true;
}

//functions for the prequestions
function preQuestions(qNum) {
  if (qNum == window.expParam.prequestions.length) {
    console.log('Start task');
    startTrial();
  } else {
    let question = window.expParam.prequestions[qNum],
      html = '',
      keys = ['enter'];
    if (question.type == 'textbox') {
      html = '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>' +
        question.question + '</label>' +
        '<input type="text" placeholder="' +
        question.placeholder +
        '" class="textAnswer" required />' +
        '</div>' +
        '</form>'
    } else if (question.type == 'choice') {
      html = question.question + '<br>';
      for (var i = 0; i < question.choices.length; i++) {
        if (question.choices[i].toLowerCase() != 'other') {
          html += '<label class="radioContainer">' +
            question.choices[i] +
            '<input type="radio" name="radio"> <span class="checkmark"></span> </label>'
        } else {
          html += '<label class="radioContainer" onclick="otherRadioClick()"><input type="radio" name="radio"><label>Other: <input type="text" class="radioOther"></label><span class="checkmark"></span> </label>'
        }
      }
    } else if (question.type == 'text') {
      html = question.question;
    } else if (question.type == 'specialKey') {
      keys = ['p', 'q'];
      html = question.question;
    }
    $.confirm({
      title: question.title,
      content: html,
      type: 'blue',
      boxWidth: '55%',
      useBootstrap: false,
      typeAnimated: true,
      buttons: {
        formSubmit: {
          text: 'Next',
          btnClass: 'btn-blue',
          keys: keys,
          action: function() {
            if (question.type == 'textbox') {
              var textAns = this.$content.find('.textAnswer').val();
              if (!textAns) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please provide a valid answer',
                  type: 'red',
                });
                return false;
              } else {
                window.expData.preQuestions.push({
                  question: question.title,
                  answer: textAns
                });
                preQuestions(qNum + 1);
              }
            } else if (question.type == 'choice') {
              var radioList = this.$content.find($('.radioContainer'));
              for (var j = 0; j < radioList.length; j++) {
                if (radioList[j].getElementsByTagName('input')[0].checked) {

                  if (question.choices[j].toLowerCase() != 'other') {
                    window.expData.preQuestions.push({
                      question: question.title,
                      answer: question.choices[j]
                    });
                  } else if (this.$content.find('.radioOther').val().length == 0) {
                    $.alert({
                      title: 'Error',
                      boxWidth: '25%',
                      useBootstrap: false,
                      content: 'If you select other, please do not leave it blank.',
                      type: 'red',
                    });
                    return false;
                  } else {
                    window.expData.preQuestions.push({
                      question: question.title,
                      answer: this.$content.find('.radioOther').val()
                    });
                  }
                  preQuestions(qNum + 1);
                  return true;
                }
              }
              $.alert({
                title: 'Error',
                boxWidth: '25%',
                useBootstrap: false,
                content: 'Please select an answer',
                type: 'red',
              });
              return false;
            } else {
              preQuestions(qNum + 1);
            }
          }
        }
      },
      onContentReady: function() {
        var jc = this;
        this.$content.find('form').on('submit', function(e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      },
      onOpenBefore: function() {
        if (question.type == 'specialKey') {
          this.buttons.formSubmit.hide();
        }
      }
    });
  }
}

//functions for the prequestions
function postQuestions(qNum) {
  if (qNum == window.expParam.postquestions.length) {
    console.log("Experiment Done");
    saveData(window.unID + '.csv', window.unID + '_partial.csv', dataToCSV());
  } else {
    let question = window.expParam.postquestions[qNum],
      html = '';
    if (question.type == 'textbox') {
      html = '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>' +
        question.question + '</label>' +
        '<input type="text" placeholder="' +
        question.placeholder +
        '" class="textAnswer" required />' +
        '</div>' +
        '</form>'
    } else if (question.type == 'choice') {
      html = question.question + '<br>';
      for (var i = 0; i < question.choices.length; i++) {
        if (question.choices[i].toLowerCase() != 'other') {
          html += '<label class="radioContainer">' +
            question.choices[i] +
            '<input type="radio" name="radio"> <span class="checkmark"></span> </label>'
        } else {
          html += '<label class="radioContainer" onclick="otherRadioClick()"><input type="radio" name="radio"><label>Other: <input type="text" class="radioOther"></label><span class="checkmark"></span> </label>'
        }
      }
    } else if (question.type == 'text') {
      html = question.question;
    } else if (question.type == "number") {
      html = question.question + '<br>' + "<input type=\"number\" id=\"ageInput\" min=\"" + question.min + "\" max=\"" + question.max + "\">";
    }
    $.confirm({
      title: question.title,
      content: html,
      type: 'blue',
      boxWidth: '55%',
      useBootstrap: false,
      typeAnimated: true,
      buttons: {
        formSubmit: {
          text: 'Next',
          btnClass: 'btn-blue',
          keys: ['enter'],
          action: function() {
            if (question.type == 'textbox') {
              var textAns = this.$content.find('.textAnswer').val();
              if (!textAns) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please provide a valid answer',
                  type: 'red',
                });
                return false;
              } else {
                window.expData.postQuestions.push({
                  question: question.title,
                  answer: textAns
                });
                postQuestions(qNum + 1);
              }
            } else if (question.type == 'choice') {
              var radioList = this.$content.find($('.radioContainer'));
              for (var j = 0; j < radioList.length; j++) {
                if (radioList[j].getElementsByTagName('input')[0].checked) {

                  if (question.choices[j].toLowerCase() != 'other') {
                    window.expData.postQuestions.push({
                      question: question.title,
                      answer: question.choices[j]
                    });
                  } else if (this.$content.find('.radioOther').val().length == 0) {
                    $.alert({
                      title: 'Error',
                      boxWidth: '25%',
                      useBootstrap: false,
                      content: 'If you select other, please do not leave it blank.',
                      type: 'red',
                    });
                    return false;
                  } else {
                    window.expData.postQuestions.push({
                      question: question.title,
                      answer: this.$content.find('.radioOther').val()
                    });
                  }
                  postQuestions(qNum + 1);
                  return true;
                }
              }
              $.alert({
                title: 'Error',
                boxWidth: '25%',
                useBootstrap: false,
                content: 'Please select an answer',
                type: 'red',
              });
              return false;
            }
            if (question.type == 'number') {
              var textAns = this.$content.find('#ageInput').val();
              if (!textAns) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please provide a valid answer',
                  type: 'red',
                });
                return false;
              } else {
                window.expData.postQuestions.push({
                  question: question.title,
                  answer: textAns
                });
                postQuestions(qNum + 1);
              }
            } else {
              postQuestions(qNum + 1);
            }
          }
        }
      },
      onContentReady: function() {
        var jc = this;
        this.$content.find('form').on('submit', function(e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      }
    });
  }
}

//returns a random number generated by a truncated normal distribution
function normal(mean, std, left_trunc, right_trunc) {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let result = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  result *= std;
  result += mean;
  if (result < left_trunc) result = left_trunc;
  if (result > right_trunc) result = right_trunc;
  return result;
}


// starts a trial
function startTrial() {
  console.log("Trial Begin")
  fixationCross();
}

//displays the fixation cross
function fixationCross() {
  document.getElementById('fixCross').style = "";
  console.log("Trial Fixation")
  let randomTime = Math.floor(Math.random() * (window.expParam.fixation_duration[1] - window.expParam.fixation_duration[0])) + window.expParam.fixation_duration[0];
  setTimeout(function() {
    document.getElementById('fixCross').style = "display: none;";
    trial();
  }, randomTime);
}

//displays the choices
function trial() {
  console.log("Trial Nubmer: " + window.trialNumber);
  document.getElementById('instruct').style = "";
  let randomTime = Math.floor(Math.random() * (window.expParam.fixation_duration[1] - window.expParam.fixation_duration[0])) + window.expParam.fixation_duration[0];
  setTimeout(function() {
    document.getElementById('instruct').style = "display: none;";
  }, randomTime);
  window.startTime = new Date();
}

//displays the feedback
function feedback() {
  let number = document.getElementById('quantity').value;
  console.log("Feedback received:" + number);
}

//start everthing
$(document).ready(function() {

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('Mobile');
    $.confirm({
      title: "Error",
      content: "Please do not use a mobile device for this experiment.",
      type: 'red',
      boxWidth: '55%',
      useBootstrap: false,
      typeAnimated: true,
      buttons: {
        close: {
          text: "Close",
          btnClass: 'btn-blue',
          action: function() {
            return false;
          }
        }
      },
      onOpenBefore: function() {
        // before the modal is displayed.
        this.buttons.close.hide();
      },
    });
  } else {
    let expCookie = null;
    if (Cookies.get('exp')) {
      expCookie = JSON.parse(Cookies.get('exp'));
    }
    let timenow = new Date();
    if (expCookie != null && expCookie.expData.expDone) {
      $.confirm({
        title: "Thank you",
        content: "Your response has already been submitted. Thank you for participating.",
        type: 'blue',
        boxWidth: '55%',
        useBootstrap: false,
        typeAnimated: true,
        buttons: {
          close: {
            text: "Close",
            btnClass: 'btn-blue',
            action: function() {
              return false;
            }
          }
        },
        onOpenBefore: function() {
          // before the modal is displayed.
          this.buttons.close.hide();
        },
      });
    } else if (expCookie != null && (timenow - expCookie.expData.exitTime < 900000)) {
      console.log('Previous data found. Loaded in.');
      document.getElementById('total').style = "display: none;";
      window.unID = expCookie.unid;
      window.expData = expCookie.expData;
      window.trialTimeline = expCookie.trialTimeline;
      window.trialNumber = expCookie.trialNumber;
      window.pointTotal = expCookie.pointTotal;
      window.expData.timesReconnected += 1;

      //set up button presses
      window.buttonState = false;
      document.addEventListener('keyup', (e) => {
        if (window.buttonState) {
          if (e.code === "KeyQ") {
            window.choice = 1;
            window.clearTimeout(window.choiceTime);
            window.endTime = new Date();
            feedback(1);
          } else if (e.code === "KeyP") {
            window.choice = 2;
            window.clearTimeout(window.choiceTime);
            window.endTime = new Date();
            feedback(2);
          }
        }
      });
      window.addEventListener('beforeunload', function(e) {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = '';
        if (window.trialNumber != 0) {
          window.expData.exitTime = new Date().getTime();
          window.expData.totalTime += window.expData.exitTime - window.expStartTime.getTime();
          let expCookie = {};
          expCookie.unid = window.unID;
          expCookie.expData = window.expData;
          expCookie.trialTimeline = window.trialTimeline;
          expCookie.trialNumber = window.trialNumber;
          expCookie.pointTotal = window.pointTotal;
          expCookie.stimuliColors = window.stimuliColors;
          Cookies.set('exp', JSON.stringify(expCookie), {
            expires: 7
          });
        }
      });
      $.confirm({
        title: "Continue?",
        content: "Welcome back to the experiment.",
        type: 'blue',
        boxWidth: '55%',
        useBootstrap: false,
        typeAnimated: true,
        buttons: {
          close: {
            text: "Continue",
            btnClass: 'btn-blue',
            action: function() {
              window.expStartTime = new Date();
              document.getElementById('total').style = "";
              document.getElementById('total').innerText = "Total: " + window.pointTotal;
              startTrial();
            }
          }
        }
      });
    } else {

      //reset cookies
      Cookies.remove('exp');

      //set up data collection object
      window.expData = {};
      window.expData.preQuestions = [];
      window.expData.postQuestions = [];
      window.expData.trialData = [];
      window.expData.attentionCheck = [];
      window.expStartTime = new Date();
      window.unID = window.expStartTime.getTime() + "" + Math.floor(Math.random() * 10);
      window.expData.totalTime = 0;
      window.expData.expDone = false;
      window.expData.timesReconnected = 0;

      // preQuestions(0);

      //set up the trials
      window.trialTimeline = [];
      window.trialNumber = 0;
      window.pointTotal = 0;

      window.addEventListener('beforeunload', function(e) {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = '';
        if (window.trialNumber != 0) {
          window.expData.exitTime = new Date().getTime();
          window.expData.totalTime += window.expData.exitTime - window.expStartTime.getTime();
          let expCookie = {};
          expCookie.unid = window.unID;
          expCookie.expData = window.expData;
          expCookie.trialTimeline = window.trialTimeline;
          expCookie.trialNumber = window.trialNumber;
          expCookie.pointTotal = window.pointTotal;
          Cookies.set('exp', JSON.stringify(expCookie), {
            expires: 7
          });
        }
      });

      preQuestions(0);
    }
  }
});
