import userSagas from './user';

export default function* rootSaga(): any {
    yield [...userSagas];
}
