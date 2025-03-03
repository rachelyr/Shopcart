import {ScaleLoader} from 'react-spinners';

export default function BigLoader(){
    return (
        <div className='w-full py-4 px-2 flex-col flex justify-center items-center h-screen'>
            <ScaleLoader color='#ed4c07'/>
        </div>
    );
}