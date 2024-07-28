const countMeters = ({amount, metersInPackage}) => metersInPackage && amount ? metersInPackage * amount : 0;

export default countMeters;
