import userSagas from './user';
import groupSagas from './group';

export default function* rootSaga(): any {
    yield [
        userSagas(),
        groupSagas(),
    ];
}
