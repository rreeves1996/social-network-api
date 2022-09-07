const moment = require('moment');

function formatDate(date) {
    const formattedDate = moment(date).format("MMM Do, YYYY"); 
    return formattedDate;
};

module.exports = { formatDate };