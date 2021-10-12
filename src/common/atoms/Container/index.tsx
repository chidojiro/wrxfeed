import React from 'react';
// import { Theme } from '@mui/material/styles';
// import withStyles from '@mui/styles/withStyles';
// import MuiContainer, { ContainerProps } from '@mui/material/Container';

// const Container = withStyles((theme: Theme) => ({
//   root: {
//     padding: theme.spacing(3),
//   },
// }))((props: ContainerProps) => <MuiContainer maxWidth="xl" {...props} />);

// interface ContainerProps = {

// }

const Container = (props: React.VFC) => <div className="p-3 max-w-xl">{props}</div>;

export default Container;
