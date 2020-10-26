const moment = require('moment');

function formatMessage(user, text){
    return{
        nickname: user.nickname,
        id: user.id,
        //avatar: user.avatar,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;