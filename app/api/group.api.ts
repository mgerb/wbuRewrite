import { AxiosPromise } from 'axios';
import api from './api';
import querystring from 'query-string';

class groupAPI {

    public createGroup(name: string, password: string, publicGroup: boolean): AxiosPromise {
        return api.post('/group/createGroup', querystring.stringify({
            name,
            password,
            public: publicGroup,
        }));
    }

    public joinPublicGroup(groupID?: number, password?: string): AxiosPromise {
        return api.post('/group/joinPublicGroup', querystring.stringify({
            groupID,
            password,
        }));
    }

    public searchPublicGroups(name: string): AxiosPromise {
        return api.post('/group/searchPublicGroups', querystring.stringify({
            name,
        }));
    }

    public getUserGroups(): AxiosPromise {
        return api.get('/group/getUserGroups');
    }

    public getGroupUsers(groupID: number): AxiosPromise {
        return api.get(`/group/getGroupUsers/${groupID}`);
    }

    public inviteUserToGroup(inviteUserID?: number, groupID?: number): AxiosPromise {
        return api.post('/group/inviteUserToGroup', querystring.stringify({
            inviteUserID,
            groupID,
        }));
    }

    public getGroupInvites(): AxiosPromise {
        return api.get('/group/getGroupInvites');
    }

    public joinGroupFromInvite(groupID?: number): AxiosPromise {
        return api.post('/group/joinGroupFromInvite', querystring.stringify({
            groupID,
        }));
    }

    public deleteGroupInvite(groupID?: number): AxiosPromise {
        return api.post('/group/deleteGroupInvite', querystring.stringify({
            groupID,
        }));
    }

    public leaveGroup(groupID: number): AxiosPromise {
        return api.post('/group/leaveGroup', querystring.stringify({
            groupID,
        }));
    }

    public removeUserFromGroup(userID: number, groupID: number): AxiosPromise {
        return api.post('/group/removeUserFromGroup', querystring.stringify({
            userID,
            groupID,
        }));
    }

    public deleteGroup(groupID: number): AxiosPromise {
        return api.post('/group/deleteGroup', querystring.stringify({
            groupID,
        }));
    }

    public storeMessage(groupID?: number, message?: string): AxiosPromise {
        return api.post('/group/storeMessage', querystring.stringify({
            groupID,
            message,
        }));
    }

    public getMessages(groupID: number, timestamp: number = 0): AxiosPromise {
        return api.get(`/group/getMessages/${groupID}/${timestamp}`);
    }

    public updateGroupInfo(groupID: number, password: string, publicGroup: boolean): AxiosPromise {
        return api.post('/group/updateGroupInfo', querystring.stringify({
            groupID,
            password,
            public: publicGroup,
        }));
    }
}

export default new groupAPI();
