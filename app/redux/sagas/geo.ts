import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../constants';
import geoActions from '../actions/geo';
import geoAPI from '../../api/geo.api';
import storage from '../../utils/storage';
import { GeoLocationType } from '../reducers/geo';

function* getGeoLocationsFromStorage(action: {userID:number,groupID:number}): any {
    try {
        const geoLocations: Array<GeoLocationType> = yield call(storage.getGeoLocations, action.userID, action.groupID);

        if (geoLocations && geoLocations.length > 0) {
            yield put(geoActions.setGeoLocations(geoLocations));
        }

    } catch(error) {

    }

    // fetch from server after getting from storage
    yield put(geoActions.getGeoLocationsFetchRequested(action.userID, action.groupID));
}

function* getGeoLocationsFetchRequested(action: any): any {
    try {

        // get groups from api
        const response = yield call(geoAPI.getGeoLocations, action.groupID);

        const geoLocations: Array<GeoLocationType> = response.data;

        yield put(geoActions.getGeoLocationsFetchSucceeded());

        yield put(geoActions.setGeoLocations(geoLocations));

        // store geo locations in storage
        yield call(storage.storeGeoLocations, action.userID, action.groupID, geoLocations);


    } catch (error) {
        yield put(geoActions.getGeoLocationsFetchFailed());
    }
}

export default function* watches() {
    yield takeLatest(types.GET_GEO_LOCATIONS_FETCH_REQUESTED, getGeoLocationsFetchRequested);
    yield takeLatest(types.GET_GEO_LOCATIONS_FROM_STORAGE, getGeoLocationsFromStorage);
}
