import React from 'react';
import { Box, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const TeamMembersCard = ({ data, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ ...getCrmStyle('teamMembersCard', theme), flexGrow: 1 }}>
      <Typography variant="h6">{data.customer_card.title}</Typography>
      <Box sx={getCrmStyle('teamMembersList', theme)}>
        <Box sx={[getCrmStyle('teamMemberItem', theme), { header: true }]}>
          {data.customer_card.columns.map((column, index) => (
            <Typography key={index} variant="body2">{column}</Typography>
          ))}
        </Box>
        {data.customer_card.customers.map((customer, index) => (
          <Box key={index} sx={getCrmStyle('teamMemberItem', theme)}>
            <Box display="flex" alignItems="center">
              <Box sx={getCrmStyle('memberIcon', theme)} />
              <Typography variant="body2">{customer.name}</Typography>
            </Box>
            <Typography variant="body2">{customer.amount}</Typography>
            <Typography
              variant="body2"
              sx={{
                color: customer.status === 'PAID' ? theme.palette.success.main : customer.status === 'PENDING' ? theme.palette.warning.main : theme.palette.error.main,
              }}
            >
              {customer.status}
            </Typography>
            <Typography variant="body2">{customer.paid_by}</Typography>
            <IconButton aria-label="More options" onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default TeamMembersCard;