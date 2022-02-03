const moment = require('moment-timezone');
const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().tz("Asia/Kolkata").format('h:mm a')
    }

}

module.exports = formatMessage;
