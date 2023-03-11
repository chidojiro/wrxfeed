import { PieProps, Sector } from 'recharts';

const PieActiveShape: PieProps['activeShape'] = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}) => {
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius * 0.95}
      outerRadius={outerRadius * 1.05}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

export default PieActiveShape;
