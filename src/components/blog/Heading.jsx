


const Headings = ({ heading, breadcumb }) => {
  return (
    <>
      <div className="flex flex-col justify-center bg-blue-500 p-5 rounded-3xl h-72 overflow-hidden">
    
          <h1 className="md:ml-10 font-bold text-4xl text-white md:text-6xl">
            {heading}
          </h1>
      
        <p className="mt-3 md:ml-10 text-white text-xs capitalize">
          Home <span className="px-2">&gt;</span> {breadcumb}
        </p>
      </div>
    </>
  );
};

export default Headings;