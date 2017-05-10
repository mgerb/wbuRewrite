import { AxiosPromise } from 'axios';
import api from './api';
import querystring from 'query-string';

class geoAPI {

    public storeGeoLocation(groupID: number, latitude: number, longitude: number, waypoint: string): AxiosPromise {
        return api.post('/geo/storeGeoLocation', querystring.stringify({
            groupID,
            latitude,
            longitude,
            waypoint,
        }));
    }

    public getGeoLocations(groupID: number): AxiosPromise {
        return api.get(`/geo/getGeoLocations/${groupID}`);
    }
}


export default new geoAPI();
