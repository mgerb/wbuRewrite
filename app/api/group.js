import api from './api';
import querystring from 'querystring';

export default class group {

    createGroup(groupName: string, password: string, publicGroup: bool) {
        return api.post('/group/createGroup', querystring.stringify({
            groupName,
            password,
            public: publicGroup
        }));
    }

    joinPublicGroup(groupID, password) {
        return api.post('/group/joinPublicGroup', querystring.stringify({
            groupID,
            password,
        }));
    }

    searchPublicGroups(groupName) {
        return api.post('/group/searchPublicGroups', querystring.stringify({
            groupName,
        }));
    }

    getUserGroups() {
        return api.get('/group/getUserGroups');
    }

    getGroupUsers(groupID) {
        return api.get(`/group/getGroupUsers/${groupID}`);
    }

    inviteUserToGroup(inviteUserID, groupID) {
        return api.post('/group/inviteUserToGroup', querystring.stringify({
            inviteUserID,
            groupID,
        }));
    }

    getGroupInvites() {
        return api.get('/group/getGroupInvites');
    }

    joinGroupFromInvite(groupID) {
        return api.post('/group/joinGroupFromInvite', querystring.stringify({
            groupID,
        }));
    }

    leaveGroup(groupID) {
        return api.post('/group/leaveGroup', querystring.stringify({
            groupID,
        }));
    }

    kickUserFromGroup(userID, groupID) {
        return api.post('/group/kickUserFromGroup', querystring.stringify({
            userID,
            groupID,
        }));
    }

    deleteGroup(groupID) {
        return api.post('/group/deleteGroup', querystring.stringify({
            groupID,
        }));
    }

    storeMessage(groupID, message) {
        return api.post('/group/storeMessage', querystring.stringify({
            groupID,
            message,
        }));
    }

    getMessages(groupID, timestamp) {
        return api.get(`/group/getMessages/${groupID}/${timestamp}`);
    }
}
