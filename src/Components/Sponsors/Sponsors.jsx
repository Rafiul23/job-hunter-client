import Image from 'next/image';
import airbnb from '../../assets/airbnb.jpg';
import google from '../../assets/google.jpg';
import netflix from '../../assets/netflix.jpg';
import tesla from '../../assets/tesla.jpg';

const Sponsors = () => {
    return (
        <div className='py-10'>
            <h1 className="text-5xl text-[#033f63] font-bold text-center my-4">Our Sponsors</h1>

            <div className='flex justify-between max-w-6xl mt-4 flex-wrap mx-auto'>
                <Image src={airbnb} width={100} height={100} alt='airbnb' />
                <Image src={google} width={100} height={100} alt='google' />
                <Image src={netflix} width={100} height={100} alt='netflix' />
                <Image src={tesla} width={100} height={100} alt='tesla' />
            </div>
        </div>
    );
};

export default Sponsors;