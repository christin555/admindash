import countMeters from './countMeters';

const renderMeters = ({amount, meters, metersInPackage}) => {
  const count = ` ${amount} уп`;
  const metersCount = meters ?? countMeters({amount, metersInPackage});

  const metersAll = metersCount ? ` (${Number(metersCount).toFixed(3)} м²)` : '';

  return count + metersAll;
};

export default renderMeters;
