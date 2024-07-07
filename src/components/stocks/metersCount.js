const renderMeters = ({amount, metersInPackage}) => {
  const count = ` ${amount} уп`;
  const meters = metersInPackage && amount ? ` (${metersInPackage * amount} м²)` : '';

  return count + meters;
};

export default renderMeters;
