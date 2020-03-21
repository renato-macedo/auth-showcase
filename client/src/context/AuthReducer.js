const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        email: action.payload.email,
        error: '',
        loading: false
      };

    case 'DATA':
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        token: '',
        data: [],
        error: '',
        loading: false
      };
    default:
      return state;
  }
};

export default AuthReducer;
