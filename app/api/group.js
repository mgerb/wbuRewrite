// @flow

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

    joinPublicGroup(groupID: number, password: string) {
        return api.post('/group/joinPublicGroup', querystring.stringify({
            groupID,
            password,
        }));
    }

    searchPublicGroups(groupName: string) {
        return api.post('/group/searchPublicGroups', querystring.stringify({
            groupName,
        }));
    }

    getUserGroups() {
        return api.get('/group/getUserGroups');
    }

    getGroupUsers(groupID: number) {
        return api.get(`/group/getGroupUsers/${groupID}`);
    }

    inviteUserToGroup(inviteUserID: number, groupID: number) {
        return api.post('/group/inviteUserToGroup', querystring.stringify({
            inviteUserID,
            groupID,
        }));
    }

    getGroupInvites() {
        return api.get('/group/getGroupInvites');
    }

    joinGroupFromInvite(groupID: number) {
        return api.post('/group/joinGroupFromInvite', querystring.stringify({
            groupID,
        }));
    }

    leaveGroup(groupID: number) {
        return api.post('/group/leaveGroup', querystring.stringify({
            groupID,
        }));
    }

    kickUserFromGroup(userID: number, groupID: number) {
        return api.post('/group/kickUserFromGroup', querystring.stringify({
            userID,
            groupID,
        }));
    }

    deleteGroup(groupID: number) {
        return api.post('/group/deleteGroup', querystring.stringify({
            groupID,
        }));
    }

    storeMessage(groupID: number, message: string) {
        return api.post('/group/storeMessage', querystring.stringify({
            groupID,
            message,
        }));
    }

    getMessages(groupID: number, timestamp: number) {
        return api.get(`/group/getMessages/${groupID}/${timestamp}`);
    }
}
