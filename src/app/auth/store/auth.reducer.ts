import { AuthActions, AuthActionTypes } from "./auth.actions";
import { User } from "src/app/interfaces";

export interface AuthState {
    isAuth: boolean;
    loading: boolean;
    error: string;
    token: string;
    user: null | User;
}

export const initialState: AuthState = {
    isAuth: false,
    loading: false,
    error: "",
    token: "",
    user: {
        picture: "",
        username: "Unknown User"
    }
};

export function authReducer(
    state = initialState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionTypes.LogInRequest:
            return {
                ...state,
                isAuth: false,
                loading: true,
                error: "",
                token: "",
                user: {
                    picture: "",
                    username: "Unknown User"
                }
            };

        case AuthActionTypes.LogInSuccess:
            return {
                ...state,
                isAuth: true,
                loading: false,
                error: "",
                token: action.payload.token,
                user: action.payload.user
            };

        case AuthActionTypes.LogInFailure:
            return {
                ...state,
                isAuth: false,
                loading: false,
                error: action.payload.error,
                token: "",
                user: {
                    picture: "",
                    username: "Unknown User"
                }
            };

        case AuthActionTypes.SignUpRequest:
            return {
                ...state,
                isAuth: false,
                loading: true,
                error: "",
                token: "",
                user: {
                    picture: "",
                    username: "Unknown User"
                }
            };

        case AuthActionTypes.SignUpSuccess:
            return {
                ...state,
                isAuth: false,
                loading: false,
                error: "",
                token: "",
                user: {
                    picture: "",
                    username: "Unknown User"
                }
            };

        case AuthActionTypes.SignUpFailure:
            return {
                ...state,
                isAuth: false,
                loading: false,
                error: "",
                token: "",
                user: {
                    picture: "",
                    username: "Unknown User"
                }
            };

        default:
            return state;
    }
}
