const moment = require('moment');
module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let emoj = "💾";

    if (randomNum > 0.7) {
      emoj = "🖨";
    } else if (randomNum > 0.4) {
      emoj = "📱";
    }

    return `<span for="img">${emoj}</span>`;
  },
  trim_string: (stringToTrim)=>{
    let newString = stringToTrim.substring(0,170);
    return newString;
  },
  format_date: (dateToFormat)=>{
    let newDate = moment(dateToFormat).format('M-D-YYYY');
    return newDate;
  },
  add_one: (numSent)=>{
    return (numSent+1);
  },
  is_one:(num)=>{
    if (num===0){
      return "topDog";
    }
    return;
  }, 
  is_two:(num)=>{
    if (num===1){
      return "secondDog";
    }
    return;
  },
  is_three:(num)=>{
    if (num===2){
      return "thirdDog";
    }
    return;
  },
  setVariable: (varName, varValue, options)=>{
    options.data.root[varName] = varValue;
  },
  is_generic_pic: (imgfile)=>{
    if (imgfile === 'profile.png'){
      return true;
    }
    else {
      return false;
    }
  },
  
  
};
