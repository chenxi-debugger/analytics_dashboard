import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';
import Headerbar from './components/Headerbar'; // Import Headerbar
import AnalyticsPage from './pages/AnalyticsPage';
import CrmPage from './pages/CrmPage';
import EcommercePage from './pages/EcommercePage';
import Footer from './components/Footer';
import EmailPage from './pages/EmailPage';
import ChatPage from './pages/ChatPage';
import CalendarPage from './pages/CalendarPage';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ColorModeContext } from './theme/themeContext';

const App = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = useState(false);
  const [isBaseMini, setIsBaseMini] = useState(isLargeScreen);
  const [isHovering, setIsHovering] = useState(false);

  const isMini = isBaseMini && !isHovering;
  const drawerWidth = isLargeScreen && isMini ? 80 : 280;

  const handleDrawerToggle = () => {
    if (!isLargeScreen) {
      setOpen(!open);
    }
  };

  const handleMiniToggle = () => {
    setIsBaseMini(!isBaseMini);
  };

  const handleMouseEnter = () => {
    if (isLargeScreen && isBaseMini) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen && isBaseMini) {
      setIsHovering(false);
    }
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Headerbar */}
        <Headerbar
          drawerWidth={drawerWidth}
          theme={theme}
          handleDrawerToggle={handleDrawerToggle}
        />

        {/* Sidebar */}
        <Sidebar
          open={open}
          onToggle={setOpen}
          isMini={isMini}
          onToggleMini={handleMiniToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            mb: 6,
            width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Routes>
            <Route path="/" element={<AnalyticsPage />} />
            <Route path="/dashboards/crm" element={<CrmPage />} />
            <Route path="/dashboards/ecommerce" element={<EcommercePage />} />
            <Route path="/apps/email" element={<EmailPage />} />
            <Route path="/apps/email/:tab" element={<EmailPage />} />
            <Route path="/apps/email/label/:labelName" element={<EmailPage />} />
            <Route path="/apps/chat" element={<ChatPage />} />
            <Route path="/apps/calendar" element={<CalendarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Footer */}
          <Box
            sx={{
              mt: 'auto',
              position: 'sticky',
              bottom: 0,
              zIndex: 1000,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default App;