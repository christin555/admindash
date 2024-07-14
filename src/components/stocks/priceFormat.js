const renderPrice = (price) => price ? ` ${price.toLocaleString('ru')} руб` : null;

export default renderPrice;
