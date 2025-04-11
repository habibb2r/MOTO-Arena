

interface HeaderProps {
  image: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ image, text }) => {
  return (
    <div>
     <div
  className="h-56 lg:h-[400px] flex items-center justify-center w-full bg-no-repeat bg-center bg-cover"
  style={{
    backgroundImage: `linear-gradient(to right, rgba(154, 248, 240, 0.5), rgba(255, 81, 147, 0.5)), url(${image})`,
  }}
>
        <h1 className="lg:text-5xl text-3xl md:text-4xl font-bold  underline">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default Header;
