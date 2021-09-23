import React from 'react';
import './DiscussionList.css';
import { DiscussionSimple, dummyDiscussionSimple } from './dummy';

export type TextBoldProps = {
  text: string;
};

const TextBold: React.FC<TextBoldProps> = ({ text }) => (
  <p
    style={{
      display: 'flex',
      color: '#273240',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: '18px',
      margin: 0,
    }}
  >
    {`${text}`}
  </p>
);

export type DiscussionListProps = {
  data?: DiscussionSimple[];
  style?: React.CSSProperties;
};

const DiscussionList: React.FC<DiscussionListProps> = ({
  data = dummyDiscussionSimple,
  style,
  children,
}) => {
  return (
    <div style={{ ...style, marginTop: 70, maxWidth: 712 }}>
      {data.map((item: DiscussionSimple, index: number) => {
        const { commentBy, id, postName, time, content } = item;
        const interleaveBackground = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
        return (
          <div
            key={id}
            className="cellDiscussion"
            style={{
              backgroundColor: interleaveBackground,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextBold text={commentBy} />
              <p
                style={{
                  display: 'flex',
                  color: '#273240',
                  fontSize: 14,
                  lineHeight: '18px',
                  margin: 0,
                  marginLeft: 4,
                  marginRight: 4,
                }}
              >
                {' mentioned you in '}
              </p>
              <TextBold text={postName} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                paddingLeft: 64,
              }}
            >
              <p
                style={{
                  display: 'flex',
                  fontSize: 14,
                  lineHeight: '17px',
                  margin: 0,
                  fontWeight: 600,
                  color: '#0F0D15',
                }}
              >
                {`${commentBy} `}
              </p>
              <p
                style={{
                  display: 'flex',
                  fontSize: 12,
                  lineHeight: '15px',
                  margin: 0,
                  color: '#9EA0AA',
                  marginLeft: 4,
                }}
              >
                {` • ${time}`}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 8,
                paddingLeft: 76,
              }}
            >
              <div
                style={{
                  width: 2,
                  height: 19,
                  borderRadius: 2,
                  backgroundColor: '#2D91AB',
                  marginRight: 8,
                }}
              />
              <p
                style={{
                  display: 'flex',
                  fontSize: 14,
                  lineHeight: '18px',
                  margin: 0,
                  backgroundColor: '#DEE6FF',
                  marginRight: 4,
                  padding: '2px 4px 2px 4px',
                  borderRadius: 4,
                  color: '#6565FB',
                }}
              >
                {`@${commentBy} `}
              </p>
              <p
                style={{
                  display: 'flex',
                  fontSize: 16,
                  lineHeight: '19px',
                  margin: 0,
                  color: '#273240',
                }}
              >
                {` ${content}`}
              </p>
            </div>
          </div>
        );
      })}
      {children}
    </div>
  );
};

export default DiscussionList;
