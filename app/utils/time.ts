import moment from 'moment';

class time {

    timestamp(unixString: number) {
        // remove 10 seconds from timestamp so it doesn't get behind server time
        return moment.unix(unixString - 10).fromNow();
    }
}

export default new time();
