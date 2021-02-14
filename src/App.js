import React, {useRef, useState, useMemo} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUser(users){
    console.log("활성");
    return users.filter(user=>user.active).length
}

function App() {
    //https://react.vlpt.us/
    //17. useMemo 를 사용하여 연산한 값 재사용하기
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const {username, email} = inputs;
    const onChange = e => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active:true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
        }
    ]);
    const nextId = useRef(4);
    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...
        const user = {
            id:nextId.current,
            username: username,
            email: email
        };
        setUsers(users.concat(user));

        setInputs({
            username: '',
            email: ''
        });
        nextId.current += 1;

    };
    const onRemove = id => {
        setUsers(users.filter(user=> user.id!==id));
    }
    const onToggle = id => {
        setUsers(
            users.map(user =>
                user.id === id ? {...user,active: !user.active} : user
            )
        );
    }
    const count = useMemo(()=>countActiveUser(users),[users]);
    return (
        <div>
            <CreateUser onChange={onChange} onCreate={onCreate} username={username} email={email}/>
            <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
            <div>활성사용자 수 : {count}</div>
        </div>
    );
}

export default App;
