import { Children } from '../../types';

type Component = (props: any) => JSX.Element | null;

type BaseConfigOptions = {
  component: Component;
};

type IfConfig = BaseConfigOptions & {
  condition: boolean;
};

type ElseConfig = BaseConfigOptions;

type Configs = IfConfig[] | [...ifConfigs: IfConfig[], elseConfig: ElseConfig];

const FallbackComponent = ({ children }: Children) => <>{children}</>;

export type ConditionalWrapperProps = Children & {
  conditions: Configs;
} & Record<string, any>;

const getTruthyConfig = (configs: Configs) => {
  if (!configs.length) return FallbackComponent;

  const lastConfig = configs[configs.length - 1];

  // If the last config is an "if" config, use its condition
  // If it's an "else" make the condition always true
  // So that "else" can always be found as the last option
  const lastConfigAsIfConfig = {
    ...lastConfig,
    condition: (lastConfig as IfConfig).condition ?? true,
  };

  const unifiedConfigs = [
    ...(configs.slice(0, configs.length - 1) as IfConfig[]),
    lastConfigAsIfConfig,
  ];

  for (const config of unifiedConfigs) {
    const { component, condition } = config;

    if (condition) return component;
  }

  return FallbackComponent;
};

export const ConditionalWrapper = ({ conditions, ...restProps }: ConditionalWrapperProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Component = getTruthyConfig(conditions);

  return <Component {...restProps} />;
};
