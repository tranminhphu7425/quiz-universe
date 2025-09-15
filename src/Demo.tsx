import {useState, useCallback, memo}  from "react";

const Button = memo( ({onClick, label}: {onClick: () => void, label: React.ReactNode}) => {

    console.log('Button render');
    return <button onClick={onClick}>{label}</button>;

});


export function Counter() {
    const [count, setCount] = useState(0);

    const onClickNew = ( ) => setCount(c => c + 1);

    return (
        <div>
            <p>
                Count: {count}
            </p>
            <Button onClick={onClickNew} label="New" />
        </div>
    );

}


