const countMeters = ({amount, metersInPackage}) => metersInPackage && amount ? (metersInPackage * amount).toFixed(3) : 0;

export default countMeters;
