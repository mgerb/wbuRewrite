import types from '../constants';

export interface GeoLocationType {
    id?: number;
    userID?: number;
    groupID?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    latitude?: string;
    longitude?: string;
    timestamp?: number;
    waypoint?: boolean;
}

export interface GeoStateType {

    geoLocations: Array<GeoLocationType>;

    getGeoLocationsFetchRequested: boolean;
    getGeoLocationsFetchSucceeded: boolean;
    getGeoLocationsFetchFailed: boolean;
}

const defaultState: GeoStateType = {
    geoLocations: [],

    getGeoLocationsFetchRequested: false,
    getGeoLocationsFetchSucceeded: false,
    getGeoLocationsFetchFailed: false,
};

function geo(state: GeoStateType = defaultState, action: any): any {
    switch (action.type) {

        case types.GET_GEO_LOCATIONS_FETCH_REQUESTED:
            return {...state, 
                getGeoLocationsFetchRequested: true,
                getGeoLocationsFetchSucceeded: false,
                getGeoLocationsFetchFailed: false,
            };

        case types.GET_GEO_LOCATIONS_FETCH_SUCCEEDED:
            return {...state, 
                getGeoLocationsFetchRequested: false,
                getGeoLocationsFetchSucceeded: true,
                getGeoLocationsFetchFailed: false,
            };

        case types.GET_GEO_LOCATIONS_FETCH_FAILED:
            return {...state, 
                getGeoLocationsFetchRequested: false,
                getGeoLocationsFetchSucceeded: false,
                getGeoLocationsFetchFailed: true,
            };

        case types.SET_GEO_LOCATIONS:
            return {...state,
                geoLocations: action.geoLocations,
            };

    }

    return state;
}

export default geo;
