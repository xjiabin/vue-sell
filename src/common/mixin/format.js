import moment from 'moment';

export default {
    filters: {
        formatDate: function (time, formatType = 'YYYY-MM-DD hh:mm:ss') {
            return moment(time).format(formatType);
        }
    }
}
