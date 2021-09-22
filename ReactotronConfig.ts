// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-js';

declare global {
  interface Console {
    tron: any;
  }
}

// interface PluginConfig {
//   except?: string[];
// }

const tron = Reactotron.configure().connect();
tron.clear!();
console.tron = tron;

export default tron;
