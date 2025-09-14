import { P } from 'node_modules/framer-motion/dist/types.d-Cjd591yU';
import {useMemo, useState} from 'react';

import {memo} from 'react';


const Child = memo(({user}: {user: {name:string}}) => {
    console.log('Child render');
    return <p>Hello {user.name}</p>
})


export function Demo() { 
    const [count, setCount] = useState(0);

    const user = useMemo(() => { name:  "Phú"}, []);


}
