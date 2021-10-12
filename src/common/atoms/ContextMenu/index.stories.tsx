// import React from 'react';
// import { Story, Meta } from '@storybook/react/types-6-0';
// import { MenuProps } from '@mui/material/Menu';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { ItemIcon, ItemText, Menu, MenuItem } from '.';

// export default {
//   title: 'Atoms/ContextMenu',
//   component: Menu,
// } as Meta;

// const Template: Story<MenuProps> = () => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <>
//       <Button color="primary" variant="contained" onClick={handleClick}>
//         Open Menu
//       </Button>
//       <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem>
//           <ItemIcon>
//             <BorderColorIcon fontSize="small" />
//           </ItemIcon>
//           <ItemText primary="Update" />
//         </MenuItem>
//         <MenuItem>
//           <ItemIcon>
//             <DeleteIcon fontSize="small" />
//           </ItemIcon>
//           <ItemText primary="Delete" />
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

// export const Default = Template.bind({});
