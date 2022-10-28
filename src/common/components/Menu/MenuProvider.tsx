import { Disclosure } from '@/common/hooks';
import { ReactUtils } from '@/common/utils';

const [MenuProvider, useMenuContext] = ReactUtils.createContext<{ disclosure: Disclosure }>();

export { MenuProvider, useMenuContext };
