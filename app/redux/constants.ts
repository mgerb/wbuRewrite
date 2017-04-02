// USER

class types {

    public RESET_USER_STATE: string = 'RESET_USER_STATE';

    public LOGIN_FETCH_REQUESTED: string = 'LOGIN_FETCH_REQUESTED';
    public LOGIN_FACEBOOK_FETCH_REQUESTED: string = 'LOGIN_FACEBOOK_FETCH_REQUESTED';
    public LOGIN_FETCH_SUCCEEDED: string = 'LOGIN_FETCH_SUCCEEDED';
    public LOGIN_FETCH_FAILED: string = 'LOGIN_FETCH_FAILED';

    public CREATE_USER_FETCH_REQUESTED: string = 'CREATE_USER_FETCH_REQUESTED';
    public CREATE_USER_FETCH_SUCCEEDED: string = 'CREATE_USER_FETCH_SUCCEEDED';
    public CREATE_USER_FETCH_FAILED: string = 'CREATE_USER_FETCH_FAILED';

    public REFRESH_JWT_FETCH_REQUESTED: string = 'REFRESH_JWT_FETCH_REQUESTED';
    public REFRESH_JWT_FETCH_SUCCEEDED: string = 'REFRESH_JWT_FETCH_SUCCEEDED';
    public REFRESH_JWT_FETCH_FAILED: string = 'REFRESH_JWT_FETCH_FAILED';

    // GROUP
    public RESET_GROUP_STATE: string = 'RESET_GROUP_STATE';

    public CREATE_GROUP_FETCH_REQUESTED: string = 'CREATE_GROUP_FETCH_REQUESTED';
    public CREATE_GROUP_FETCH_SUCCEEDED: string = 'CREATE_GROUP_FETCH_SUCCEEDED';
    public CREATE_GROUP_FETCH_FAILED: string = 'CREATE_GROUP_FETCH_FAILED';

    public JOIN_GROUP_FETCH_REQUESTED: string = 'JOIN_GROUP_FETCH_REQUESTED';
    public JOIN_GROUP_FETCH_SUCCEEDED: string = 'JOIN_GROUP_FETCH_SUCCEEDED';
    public JOIN_GROUP_FETCH_FAILED: string = 'JOIN_GROUP_FETCH_FAILED';

    public INVITE_USER_FETCH_REQUESTED: string = 'INVITE_USER_FETCH_REQUESTED';
    public INVITE_USER_FETCH_SUCCEEDED: string = 'INVITE_USER_FETCH_SUCCEEDED';
    public INVITE_USER_FETCH_FAILED: string = 'INVITE_USER_FETCH_FAILED';

    public GET_USER_GROUPS_FETCH_REQUESTED: string = 'GET_GROUPS_FETCH_REQUESTED';
    public GET_USER_GROUPS_FETCH_SUCCEEDED: string = 'GET_GROUPS_FETCH_SUCCEEDED';
    public GET_USER_GROUPS_FETCH_FAILED: string = 'GET_GROUPS_FETCH_FAILED';

    public GET_GROUP_USERS_FETCH_REQUESTED: string = 'GET_GROUP_USERS_FETCH_REQUESTED';
    public GET_GROUP_USERS_FETCH_SUCCEEDED: string = 'GET_GROUP_USERS_FETCH_SUCCEEDED';
    public GET_GROUP_USERS_FETCH_FAILED: string = 'GET_GROUP_USERS_FETCH_FAILED';

    public SET_SELECTED_GROUP: string = 'SET_SELECTED_GROUP';
}

export default new types();
