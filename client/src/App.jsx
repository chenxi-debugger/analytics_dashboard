import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AnalyticsPage from './pages/AnalyticsPage';
import CrmPage from './pages/CrmPage';
import EcommercePage from './pages/EcommercePage';
import Footer from './components/Footer';
import EmailPage from './pages/EmailPage';
import ChatPage from './pages/ChatPage';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const sidebarWidth = '280px'; // Matches the sidebar width defined in sidebarStyle.jsx

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          {/* Sidebar */}
          <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
            <Sidebar />
          </Box>

          {/* Main Content Area */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              ml: sidebarWidth, // Offset by sidebar width
              width: `calc(100% - ${sidebarWidth})`,
            }}
          >
            {/* Navbar (Sticky at the top) */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1100, // Ensure it stays above other content
              }}
            >
              <Navbar />
            </Box>

            {/* Main Content (Scrollable) */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                px: 3,
                py: 2,
                backgroundColor: '#f5f5f9', // Matches the background color in the screenshot
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
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Box>

            {/* Footer (Sticky at the bottom of the viewport) */}
            <Box
              sx={{
                position: 'sticky',
                bottom: 0,
                zIndex: 1000,
                backgroundColor: '#f5f5f9', // Matches the background color of the main content
              }}
            >
              <Footer />
            </Box>
          </Box>
        </Box>
      </Router>
    </QueryClientProvider>
  );
};

export default App;