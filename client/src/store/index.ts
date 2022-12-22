import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { questionReducer } from './questions';
import { resultReducer } from './result';

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
});

const store = configureStore({ reducer: rootReducer });

declare global {
  type GlobalStoreState = ReturnType<typeof store.getState>;
}
export { store };
