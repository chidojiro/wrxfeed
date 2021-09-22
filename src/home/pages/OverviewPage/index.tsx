import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import IconButton from '@mui/material/IconButton';
import MainLayout from '../../../common/templates/MainLayout';
// import ActionButtons from '../../../common/atoms/ActionButtons';

// const ToolBar = styled('div')(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   display: 'flex',
//   justifyContent: 'space-between',
// }));

// const Conversations: React.VFC = () => {
//   return <div />;
// };

const OverviewPage: React.VFC = () => {
  return (
    <MainLayout title="Overview">
      <Typography fontWeight={600} fontSize={30} paragraph>
        Company
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '16px 32px 16px 0px',
        }}
      >
        <Typography fontWeight={600} fontSize={14} paragraph>
          View
        </Typography>
        <Typography
          fontWeight={600}
          fontSize={14}
          paragraph
          style={{ marginLeft: 8, color: '#9EA0AA' }}
        >
          All
        </Typography>
      </div>
    </MainLayout>
  );
};

export default OverviewPage;
