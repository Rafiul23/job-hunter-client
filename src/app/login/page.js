import Image from 'next/image';
import loginImage from '../../assets/login.png';

const Login = () => {
    return (
        <div className='py-10'>
           <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
           <div><Image src={loginImage} alt='login image' width={500} height={500} /></div>
           <div>Form</div>
           </div>
        </div>
    );
};

export default Login;