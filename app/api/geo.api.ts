import { AxiosPromise } from 'axios';
import api from './api';
import querystring from 'query-string';

class geoAPI {

    public storeGeoLocation(latitude: number, longitude: number): AxiosPromise {
        return api.post('/geo/storeGeoLocation', querystring.stringify({
            latitude,
            longitude,
        }));
    }

    public getGeoLocations(groupID: number): AxiosPromise {
        return api.get(`/geo/getGeoLocations/${groupID}`);
    }
}


export default new geoAPI();
