
interface TitleProps {
  title: string;      
  subtitle?: string; 
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className=" text-center border-y-2 py-2 mb-5 border-green-400 mx-[5%] my-[2%]">
      <h1 className=" font-mono font-bold text-2xl md:text-3xl lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-700 text-sm md:text-base lg:text-lg mt-2">
          {subtitle}
        </p>
      )}
  
    </div>
  );
}

export default Title;