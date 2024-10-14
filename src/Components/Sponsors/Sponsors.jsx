import Image from 'next/image';
import airbnb from '../../assets/airbnb.jpg';
import google from '../../assets/google.jpg';
import netflix from '../../assets/netflix.jpg';
import tesla from '../../assets/tesla.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';

const Sponsors = () => {
    return (
        <div className='py-10'>
            <SectionTitle
            title='Our Sponsors'
            ></SectionTitle>

        <marquee behavior="scroll" direction="left">
            <div className='flex lg:gap-16 md:gap-10 gap-6 p-8 mt-8'>
                <Image src={airbnb} width={150} height={150} alt='airbnb'  />
                <Image src={google} width={150} height={150} alt='google'  />
                <Image src={netflix} width={150} height={150} alt='netflix'  />
                <Image src={tesla} width={150} height={150} alt='tesla'  />
            </div>
        </marquee>
        </div>
    );
};

export default Sponsors;