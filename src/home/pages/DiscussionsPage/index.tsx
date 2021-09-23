import React from 'react';
import Text from '@mui/material/Typography';
// import tron from 'ReactotronConfig';
// import Reactotron from 'reactotron-react-js';
import MainLayout from '../../../common/templates/MainLayout';

const DiscussionsPage: React.VFC = () => {
  return (
    <MainLayout title="Overview">
      <Text fontWeight={600} fontSize={30} paragraph>
        Discussions
      </Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '16px 32px 16px 0px',
        }}
      >
        <Text fontWeight={600} fontSize={14} paragraph>
          View
        </Text>
        <Text fontWeight={600} fontSize={14} paragraph style={{ marginLeft: 8, color: '#9EA0AA' }}>
          All
        </Text>
      </div>
    </MainLayout>
  );
};

export default DiscussionsPage;
