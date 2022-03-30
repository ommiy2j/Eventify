import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	email: '',
	photo: '',
	role: '',
	token:''
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserLogin: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.role = action.payload.role;
			state.token = action.payload.token;
		},
		setUserSignOut: (state, action) => {
			state.name = '';
			state.email = '';
			state.role = '';
			state.token = '';
		}
	}
});

export const { setUserLogin, setUserSignOut } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserRole = (state) => state.user.role;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserToken = (state) => state.user.token;
export default userSlice.reducer;
