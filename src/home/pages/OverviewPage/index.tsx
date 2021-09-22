import React from 'react';
import Text from '@mui/material/Typography';
import MainLayout from '../../../common/templates/MainLayout';

const OverviewPage: React.VFC = () => {
  return (
    <MainLayout title="Overview">
      <Text fontWeight={600} fontSize={30} paragraph>
        Company
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

export default OverviewPage;
