import types from '../constants';
import { Action, ActionCreatorsMapObject } from 'redux';
import { GeoLocationType } from '../reducers/geo';

function getGeoLocationsFetchRequested(groupID: number): any {
    return {
        type: types.GET_GEO_LOCATIONS_FETCH_REQUESTED,
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
    getGeoLocationsFetchRequested: any;
    getGeoLocationsFetchSucceeded: any;
    getGeoLocationsFetchFailed: any;
    setGeoLocations: any;
}

const actionMap: GeoActionMapType = {
    getGeoLocationsFetchRequested,
    getGeoLocationsFetchSucceeded,
    getGeoLocationsFetchFailed,
    setGeoLocations,
};

export default actionMap;
