export const host = () => 'http://localhost:3030';
export const hostFrontSkin = () => 'http://localhost:3000/shop-cards/';
export const getStats = (id) => `${host()}/statistics/${id}`;
export const sendStats = () => `${host()}/statistics/new`;

export const signUp = () => `${host()}/auth/signup`;
export const signIn = () => `${host()}/auth/signin`;
export const signOut = () => `${host()}/auth/signout`;
export const checkAuth = () => `${host()}/auth/check`;

export const getAllUsers = () => `${host()}/users`;
export const editUser = (id) => `${host()}/users/${id}`;
export const getUser = (id) => `${host()}/users/${id}`;

export const getCurrRoom = () => `${host()}/curr/room`;
export const getRooms = () => `${host()}/rooms`;

export const getAllSkins = () => `${host()}/skins`;
export const postSkin = () => `${host()}/skins`;
export const getUserSkins = (id) => `${host()}/skins/user/${id}`;
export const putSkinUser = () => `${host()}/skins/user`;
