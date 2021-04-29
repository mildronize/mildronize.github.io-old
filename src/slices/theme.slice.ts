import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppDispatch } from '../store';

/**
 * Theme Slice: Combine Actions & Reducers (Redux Toolkit)
 */

export type ThemeType = {
  isDark?: boolean;
};

const initialState: ThemeType = {
    isDark: undefined,
};

/**
 * Step 1: Setup reducers (Pure functions)
 */

const reducers = {

  setIsDark: (state: any, { payload }: PayloadAction<boolean>) => {
    state.isDark = payload;
  },

};


/**
 * Step 2: Create the slice instance
 */

const slice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers,
});


/**
 * Step 3: Setup Async actions
 */


// export function setAuthToken(token: string) {
//   return (dispatch: AppDispatch) => {
//     const decoded = setJwtTokenLocalStorage(token);
//     console.log(`decoded ${JSON.stringify(decoded)}`);
//     dispatch(actions.setAuthenticatedUserId(decoded.id));
//     // isAuthenticated should be true
//   }
// }


/**
 * Step 4: For getting the state from the Redux store
 * Export actions & reducer for using async actions
 */
export const selector: any = (state: RootState) => state.theme;
export const actions = slice.actions;
export default slice.reducer;