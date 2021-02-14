import React, {useState} from 'react';

function Counter(props) {
    const [number, setNumber] = useState(0);

    const onIncrese = () => {
        setNumber(number + 1)
    }

    const onDecrese = () => {
        setNumber(number - 1)
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrese}>+1</button>
            <button onClick={onDecrese}>-1</button>
        </div>
    );
}

export default Counter;