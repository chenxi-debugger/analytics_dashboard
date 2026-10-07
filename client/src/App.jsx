import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';
import Headerbar from './components/Headerbar'; 
import AnalyticsPage from './pages/AnalyticsPage';
import CrmPage from './pages/CrmPage';
import EcommercePage from './pages/EcommercePage';
import Footer from './components/Footer';
import EmailPage from './pages/EmailPage';
import ChatPage from './pages/ChatPage';
import CalendarPage from './pages/CalendarPage';
import InvoiceList from './pages/InvoiceList';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ColorModeContext } from './theme/themeContext';
import InvoicePreview from './pages/InvoicePreview';
import InvoiceEdit from './pages/InvoiceEdit';
import InvoiceAdd from './pages/InvoiceAdd';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import UserListPage from './pages/users/UserListPage';
import UserViewPage from './pages/users/UserViewPage';
import UserEditPage from './pages/users/UserEditPage';
import RolesPage from './pages/roles/RolesPage';
import PermissionsPage from './pages/permissions/PermissionsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfilePage from './pages/profile/UserProfilePage';
import AccountSettingsPage from './pages/account/AccountSettingsPage';
import FaqPage from './pages/faq/FaqPage';
import HelpCenterPage from './pages/help/HelpCenterPage';
import PricingPage from './pages/pricing/PricingPage';
import { MiscIndexPage, MiscScreen } from './pages/misc/MiscPages';
import TypographyPage from './pages/ui/TypographyPage';
import { IconsPage, IconsTestPage } from './pages/ui/IconsPage';
import CardsPage from './pages/ui/CardsPage';
import ComponentsPage from './pages/ui/ComponentsPage';
import FormElementsPage from './pages/forms/FormElementsPage';
import FormLayoutsPage from './pages/forms/FormLayoutsPage';
import FormValidationPage from './pages/forms/FormValidationPage';
import FormWizardPage from './pages/forms/FormWizardPage';
import WizardExamplesPage from './pages/examples/WizardExamplesPage';
import DialogExamplesPage from './pages/examples/DialogExamplesPage';
import BasicTablePage from './pages/tables/BasicTablePage';
import DataGridPage from './pages/tables/DataGridPage';
import ChartsPage from './pages/charts/ChartsPage';
import AccessControlPage from './pages/misc/AccessControlPage';
import OthersPage from './pages/misc/OthersPage';

const CARD_VARIANTS = ['basic', 'advanced', 'statistics', 'widgets', 'gamification', 'actions'];

// /misc/coming-soon, /misc/404 … (full-screen status pages)
const MiscRoute = () => {
  const { kind } = useParams();
  return <MiscScreen kind={kind} />;
};


// Sidebar + header + footer around every dashboard page.
const DashboardLayout = () => {
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
            mr: 1,
            width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Outlet />

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
  );
};

const App = () => (
  <Router>
    <Routes>
      {/* Full-screen pages without sidebar/header */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/misc/:kind" element={<MiscRoute />} />

      {/* Everything else needs a logged-in user and uses the dashboard layout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<AnalyticsPage />} />
        <Route path="/dashboards/crm" element={<CrmPage />} />
        <Route path="/dashboards/ecommerce" element={<EcommercePage />} />
        <Route path="/apps/email" element={<EmailPage />} />
        <Route path="/apps/email/:tab" element={<EmailPage />} />
        <Route path="/apps/email/label/:labelName" element={<EmailPage />} />
        <Route path="/apps/chat" element={<ChatPage />} />
        <Route path="/apps/calendar" element={<CalendarPage />} />
        <Route path="/apps/invoice/list" element={<InvoiceList />} />
        <Route path="/apps/invoice/preview" element={<InvoicePreview />} />
        <Route path="/apps/invoice/edit" element={<InvoiceEdit />} />
        <Route path="/apps/invoice/add" element={<InvoiceAdd />} />
        <Route path="/apps/user/list" element={<UserListPage />} />
        <Route path="/apps/user/view" element={<UserViewPage />} />
        <Route path="/apps/user/edit" element={<UserEditPage />} />
        <Route path="/apps/roles" element={<RolesPage />} />
        <Route path="/apps/permissions" element={<PermissionsPage />} />
        <Route path="/pages/user-profile" element={<UserProfilePage />} />
        {['/pages/account-settings', '/pages/account', '/pages/security', '/pages/billing-plans', '/pages/notifications', '/pages/connections'].map((path) => (
          <Route key={path} path={path} element={<AccountSettingsPage />} />
        ))}
        <Route path="/pages/faq" element={<FaqPage />} />
        <Route path="/pages/help-center" element={<HelpCenterPage />} />
        <Route path="/pages/pricing" element={<PricingPage />} />
        <Route path="/pages/miscellaneous" element={<MiscIndexPage />} />
        <Route path="/wizard-examples" element={<WizardExamplesPage />} />
        <Route path="/dialog-examples" element={<DialogExamplesPage />} />
        <Route path="/ui/typography" element={<TypographyPage />} />
        <Route path="/ui/icons" element={<IconsPage />} />
        <Route path="/ui/icons-test" element={<IconsTestPage />} />
        {CARD_VARIANTS.map((v) => (
          <Route key={v} path={`/ui/cards/${v}`} element={<CardsPage />} />
        ))}
        <Route path="/ui/components" element={<ComponentsPage />} />
        <Route path="/forms/elements" element={<FormElementsPage />} />
        <Route path="/forms/layouts" element={<FormLayoutsPage />} />
        <Route path="/forms/validation" element={<FormValidationPage />} />
        <Route path="/forms/wizard" element={<FormWizardPage />} />
        <Route path="/tables/table" element={<BasicTablePage />} />
        <Route path="/tables/mui-datagrid" element={<DataGridPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        {/* Static paths beat the full-screen /misc/:kind route above */}
        <Route path="/misc/access-control" element={<AccessControlPage />} />
        <Route path="/misc/others" element={<OthersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;



