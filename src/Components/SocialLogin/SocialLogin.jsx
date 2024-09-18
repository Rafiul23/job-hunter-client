import { FcGoogle } from "react-icons/fc";
import {signIn} from 'next-auth/react';

const SocialLogin = () => {

    const handleSocialLogIn = async (provider)=>{
        const res = await signIn(provider);
    }

    return (
        <div>
            <button onClick={()=>handleSocialLogIn('google')} className='btn btn-outline text-[#033f63] border-[#033f63]'><FcGoogle></FcGoogle> Login with Gmail</button>
        </div>
    );
};

export default SocialLogin;