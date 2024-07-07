const renderMeters = ({amount, metersInPackage}) => {
  const count = ` ${amount} уп`;
  const metersCount = metersInPackage && amount ? (metersInPackage * amount).toFixed(3) : 0;

  const meters = metersCount ? ` (${metersCount} м²)` : '';

  return count + meters;
};

export default renderMeters;
