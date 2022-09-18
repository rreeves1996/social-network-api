const moment = require('moment');

function getDate(date) {
    const formattedDate = moment(date).format("MMM Do, YYYY"); 
    return formattedDate;
};

module.exports = { getDate };