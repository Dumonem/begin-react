import React, {useReducer,useCallback, useRef,useMemo} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UseInputs from "./hooks/useInputs";


//https://react.vlpt.us/
//22. Context API 를 사용한 전역 값 관리
function countActiveUsers(users){
    console.log("활성");
    return users.filter(user=>user.active).length
}

const initialState = {
    inputs: {
        username: '',
        email: ''
    },
    users: [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        }
    ]
};

function reducer(state,action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            };
        case 'CREATE_USER':
            return {
                inputs: initialState.inputs,
                users: state.users.concat(action.user)
            };
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, active: !user.active } : user
                )
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            };
        default:
            return state;
    }
}

export const UserDispatch = React.createContext(null);

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {users} = state;

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <UserDispatch.Provider value={dispatch}>
            <CreateUser />
            <UserList users={users}/>
            <div>활성사용자 수 : {count}</div>
        </UserDispatch.Provider>
    );
}

export default App;
