import { Action, createSlice } from '@reduxjs/toolkit';

interface UserIdAction extends Action {
  payload: { userId: string };
}

const { actions, reducer } = createSlice({
  name: 'result',
  initialState: {
    userId: null as null | string,
    result: <any[]>[],
  },
  reducers: {
    setUserId: (state, action: UserIdAction) => {
      state.userId = action.payload.userId;
    },
  },
});

export { actions as resultActions, reducer as resultReducer };
