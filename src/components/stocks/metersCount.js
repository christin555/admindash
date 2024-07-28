import countMeters from './countMeters';

const renderMeters = ({amount, metersInPackage}) => {
  const count = ` ${amount} уп`;
  const metersCount = countMeters({amount, metersInPackage});

  const meters = metersCount ? ` (${metersCount} м²)` : '';

  return count + meters;
};

export default renderMeters;
