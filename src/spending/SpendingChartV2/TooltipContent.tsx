import { decimalLogic, DecimalType } from '@/main/utils';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export type TooltipContentProps = TooltipProps<ValueType, NameType>;

const MonthLabels: Record<string, string> = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December',
};

export const TooltipContent = ({ active, payload }: TooltipContentProps) => {
  if (active && payload) {
    const dataPoints = payload[0]?.payload;
    return (
      <div className="flex bg-primary p-2 rounded-sm text-white text-[11px]">
        <div className="flex flex-col w-[224px]">
          <div className="flex flex-row items-center">
            <p className="font-semibold">{MonthLabels[dataPoints!.name]}</p>
          </div>
          <div
            key="this-year"
            className="flex flex-row flex-grow justify-between items-center space-x-10"
          >
            <div className="flex flex-row items-center space-x-1">
              <p>Current</p>
            </div>
            <p className="text-right font-semibold">
              {decimalLogic(dataPoints?.currentYearTotal ?? 0, DecimalType.SummedNumbers, '$')}
            </p>
          </div>
          <div
            key="last-year"
            className="flex flex-row flex-grow justify-between items-center space-x-10"
          >
            <div className="flex flex-row items-center space-x-1">
              <p>Last Year</p>
            </div>
            <p className="text-right font-semibold">
              {decimalLogic(dataPoints?.previousYearTotal ?? 0, DecimalType.SummedNumbers, '$')}
            </p>
          </div>

          <div className="mt-1">
            {payload.slice(1).map(
              (data) =>
                !!data.value && (
                  <div key={data.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: data.color }}
                      ></div>
                      <span className="break-words">
                        {
                          data.payload.items.find(
                            (item: any) => item.id.toString() === data.dataKey,
                          )?.name
                        }
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="font-semibold">
                        {decimalLogic((data.value as number) ?? 0, DecimalType.SummedNumbers, '$')}
                      </span>
                      <span>
                        {' '}
                        ({Math.round((+data.value * 100) / dataPoints.currentYearTotal)})%
                      </span>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
