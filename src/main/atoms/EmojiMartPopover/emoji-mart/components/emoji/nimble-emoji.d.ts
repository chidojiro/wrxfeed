import React = require('react');

import { EmojiProps, Data } from '../../index';

export interface NimbleEmojiProps extends EmojiProps {
  data: Data;
}

declare const NimbleEmoji: React.SFC<NimbleEmojiProps>;

export { NimbleEmoji as default };
