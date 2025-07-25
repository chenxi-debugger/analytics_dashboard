import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Single styled component with props to handle different sections
const StyledFooter = styled(Box)(({ theme, variant }) => ({
  ...(variant === 'container' && {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '13px',
    backgroundColor: 'white',
    position: 'fixed',
    bottom: 0,
    width:'91%',
    boxSizing: 'border-box',


  }),
  ...(variant === 'left' && {
    display: 'flex',
    alignItems: 'center',
  }),
  ...(variant === 'links' && {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  }),
}));

export default StyledFooter;