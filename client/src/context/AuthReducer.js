const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };

    case 'DATA':
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        token: '',
        data: [],
        error: ''
      };
    default:
      return state;
  }
};

export default AuthReducer;
