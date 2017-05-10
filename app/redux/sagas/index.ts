import geoSagas from './geo';
import groupSagas from './group';
import userSagas from './user';

export default function* rootSaga(): any {
    yield [
        geoSagas(),
        groupSagas(),
        userSagas(),
    ];
}
