import types from '../constants';
import { Action, ActionCreatorsMapObject } from 'redux';
import { GeoLocationType } from '../reducers/geo';

function getGeoLocationsFromStorage(userID: number, groupID: number): any {
    return {
        type: types.GET_GEO_LOCATIONS_FROM_STORAGE,
        userID,
        groupID,
    };
}

function getGeoLocationsFetchRequested(userID: number, groupID: number): any {
    return {
        type: types.GET_GEO_LOCATIONS_FETCH_REQUESTED,
        userID,
        groupID,
    };
}

function getGeoLocationsFetchSucceeded(): Action {
    return {
        type: types.GET_GEO_LOCATIONS_FETCH_SUCCEEDED,
    };
}

function getGeoLocationsFetchFailed(): Action {
    return {
        type: types.GET_GEO_LOCATIONS_FETCH_FAILED,
    };
}

function setGeoLocations(geoLocations: Array<GeoLocationType>): any {
    return {
        type: types.SET_GEO_LOCATIONS,
        geoLocations,
    };
}

export interface GeoActionMapType extends ActionCreatorsMapObject {
    getGeoLocationsFromStorage(userID: number, groupID: number): any;
    getGeoLocationsFetchRequested(userID: number, groupID: number): any;
    getGeoLocationsFetchSucceeded(): any;
    getGeoLocationsFetchFailed(): any;
    setGeoLocations(geoLocations: Array<GeoLocationType>): any;
}

const actionMap: GeoActionMapType = {
    getGeoLocationsFromStorage,
    getGeoLocationsFetchRequested,
    getGeoLocationsFetchSucceeded,
    getGeoLocationsFetchFailed,
    setGeoLocations,
};

export default actionMap;
