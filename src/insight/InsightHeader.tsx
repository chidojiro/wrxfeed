import { ChartIcon } from '@/assets';

export const InsightHeader = () => {
  return (
    <div
      className="h-[84px] p-6 flex items-center space-x-4 rounded-[10px]"
      style={{ background: 'linear-gradient(138.74deg, #2B45A1 -12.96%, #82B2B3 100%)' }}
    >
      <div className="border border-white rounded-full p-2 w-9 h-9 flex justify-center items-center">
        <ChartIcon className="text-white" />
      </div>
      <div className="flex items-baseline space-x-1">
        <p className="text-white text-base font-semibold">Insights</p>
        <p className="text-white text-sm">- Drill down by team, category or vendor.</p>
      </div>
    </div>
  );
};
