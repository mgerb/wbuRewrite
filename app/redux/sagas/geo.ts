import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../constants';
import geoActions from '../actions/geo';
import geoAPI from '../../api/geo.api';

function* getGeoLocationsFetchRequested(action: any): any {
    try {

        // get groups from api
        const response = yield call(geoAPI.getGeoLocations, action.groupID);

        yield put(geoActions.getGeoLocationsFetchSucceeded());

        yield put(geoActions.setGeoLocations(response.data));


    } catch (error) {
        yield put(geoActions.getGeoLocationsFetchFailed());
    }
}

export default function* watches() {
    yield takeLatest(types.GET_GEO_LOCATIONS_FETCH_REQUESTED, getGeoLocationsFetchRequested);
}
