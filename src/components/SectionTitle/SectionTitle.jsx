const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="mb-10 md:w-3/12 mx-auto">
            <p className="text-yellow-600 text-center">---{subheading}---</p>
            <h3 className="text-3xl text-center uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;