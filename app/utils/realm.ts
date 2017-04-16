import realm from 'realm';
import moment from 'moment';
import _ from 'lodash';
import { MessageType } from '../redux/reducers/group';


const Message = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
        id: 'int',
        userID: 'int',
        groupID: 'int',
        firstName: 'string',
        lastName: 'string',
        content: 'string',
        timestamp: 'date',
    },
};

const myRealm = new realm({ schema: [Message] });


class _MessageRealm {

    storeMessages(messages: Array<MessageType>): void {
        myRealm.write(() => {
            _.each(messages, (message: MessageType) => {
                myRealm.create('Message', {
                    id: message.id,
                    userID: message.userID,
                    groupID: message.groupID,
                    firstName: message.firstName,
                    lastName: message.lastName,
                    content: message.content,
                    timestamp: moment.unix(message.timestamp).toDate(), //convert to realm date format
                }, true);
            });
        });
    }

    getMessages(groupID: Number): Array<MessageType> {

        let messages: Array<MessageType> = []
        myRealm.objects('Message').filtered(`groupID = "${groupID}"`).sorted('timestamp').forEach((message: MessageType) => {
            // we need to convert the timestamp to a unix string
            let newMessage = {...message, timestamp: moment(message.timestamp).unix()};
            messages.push(newMessage);
        });

        let length = messages.length;
        return messages.slice(length - 11, length);
    }

    getLastMessageDate(groupID: Number): Number {
        let messages = this.getMessages(groupID);
        console.log(messages[0]);
        return messages.length > 0 ? messages[0].timestamp : 0;
    }

}

export const MessageRealm = new _MessageRealm();
