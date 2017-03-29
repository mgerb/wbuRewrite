import { AxiosPromise } from 'axios';
import api from './api';
import querystring from 'query-string';

export default class group {

    createGroup(groupName: string, password: string, publicGroup: boolean): AxiosPromise {
        return api.post('/group/createGroup', querystring.stringify({
            groupName,
            password,
            public: publicGroup
        }));
    }

    joinPublicGroup(groupID: number, password: string): AxiosPromise {
        return api.post('/group/joinPublicGroup', querystring.stringify({
            groupID,
            password,
        }));
    }

    searchPublicGroups(groupName: string): AxiosPromise {
        return api.post('/group/searchPublicGroups', querystring.stringify({
            groupName,
        }));
    }

    getUserGroups(): AxiosPromise {
        return api.get('/group/getUserGroups');
    }

    getGroupUsers(groupID: number): AxiosPromise {
        return api.get(`/group/getGroupUsers/${groupID}`);
    }

    inviteUserToGroup(inviteUserID: number, groupID: number): AxiosPromise {
        return api.post('/group/inviteUserToGroup', querystring.stringify({
            inviteUserID,
            groupID,
        }));
    }

    getGroupInvites(): AxiosPromise {
        return api.get('/group/getGroupInvites');
    }

    joinGroupFromInvite(groupID: number): AxiosPromise {
        return api.post('/group/joinGroupFromInvite', querystring.stringify({
            groupID,
        }));
    }

    leaveGroup(groupID: number): AxiosPromise {
        return api.post('/group/leaveGroup', querystring.stringify({
            groupID,
        }));
    }

    kickUserFromGroup(userID: number, groupID: number): AxiosPromise {
        return api.post('/group/kickUserFromGroup', querystring.stringify({
            userID,
            groupID,
        }));
    }

    deleteGroup(groupID: number): AxiosPromise {
        return api.post('/group/deleteGroup', querystring.stringify({
            groupID,
        }));
    }

    storeMessage(groupID: number, message: string): AxiosPromise {
        return api.post('/group/storeMessage', querystring.stringify({
            groupID,
            message,
        }));
    }

    getMessages(groupID: number, timestamp: number): AxiosPromise {
        return api.get(`/group/getMessages/${groupID}/${timestamp}`);
    }
}
