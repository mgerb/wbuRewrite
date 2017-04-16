import moment from 'moment';

class time {

    timestamp(unixString: number) {
        return moment.unix(unixString).fromNow();
    }
}

export default new time();
