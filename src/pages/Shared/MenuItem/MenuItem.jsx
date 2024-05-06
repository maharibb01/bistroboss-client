const MenuItem = ({ item }) => {

    const { name, image, price, recipe } = item;

    return (
        <div className="flex gap-2">
            <img src={image} className="w-[104px]" style={{borderRadius: "0 200px 200px 200px"}} />
            <div>
                <h3 className="uppercase">{name}--------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-600">${price}</p>
        </div>
    );
};

export default MenuItem;