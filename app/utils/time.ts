import moment from 'moment';

class time {

    timestamp(unixString: string) {
        return moment.unix(parseInt(unixString)).fromNow();
    }
}

export default new time();
