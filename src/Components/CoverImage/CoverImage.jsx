import Image from "next/image";
import corporateImage from '@/assets/globalisation-1014524_1280.png';

const CoverImage = ()=>{
    return <Image
    src={corporateImage}
    className="w-full h-[250px]"
    width={1200}
    alt="corporate"
  />;
}

export default CoverImage;