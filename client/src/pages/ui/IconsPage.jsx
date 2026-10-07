import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, InputAdornment, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home,
  Dashboard,
  Search,
  Settings,
  Person,
  People,
  Group,
  AccountCircle,
  Lock,
  LockOpen,
  Email,
  Inbox,
  Send,
  Chat,
  Notifications,
  NotificationsOff,
  CalendarMonth,
  Event,
  Schedule,
  AccessTime,
  Alarm,
  Today,
  Add,
  Remove,
  Edit,
  Delete,
  Save,
  Close,
  Check,
  Clear,
  Done,
  DoneAll,
  Refresh,
  Sync,
  Undo,
  Redo,
  ContentCopy,
  ContentPaste,
  ContentCut,
  Download,
  Upload,
  CloudUpload,
  CloudDownload,
  AttachFile,
  Link,
  Share,
  Print,
  Visibility,
  VisibilityOff,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  ThumbUp,
  ThumbDown,
  Bookmark,
  BookmarkBorder,
  Flag,
  Info,
  Warning,
  Error,
  Help,
  CheckCircle,
  Cancel,
  Block,
  Report,
  ShoppingCart,
  Store,
  CreditCard,
  Payment,
  AttachMoney,
  Receipt,
  LocalShipping,
  Inventory,
  Sell,
  BarChart,
  PieChart,
  ShowChart,
  Timeline,
  TrendingUp,
  TrendingDown,
  Insights,
  Analytics,
  Leaderboard,
  Folder,
  FolderOpen,
  Description,
  Article,
  InsertDriveFile,
  Image,
  PictureAsPdf,
  VideoLibrary,
  MusicNote,
  Phone,
  Smartphone,
  Laptop,
  DesktopWindows,
  Tablet,
  Watch,
  Headphones,
  Keyboard,
  Mouse,
  Wifi,
  Bluetooth,
  Language,
  Public,
  Place,
  Map,
  Navigation,
  DarkMode,
  LightMode,
  Palette,
  Brush,
  Code,
  Terminal,
  BugReport,
  Build,
  Extension,
  Storage,
  Memory,
  Security,
  VerifiedUser,
  AdminPanelSettings,
  Logout,
  Login,
  Menu,
  MoreVert,
  MoreHoriz,
  ExpandMore,
  ExpandLess,
  ChevronLeft,
  ChevronRight,
  ArrowBack,
  ArrowForward,
  ArrowUpward,
  ArrowDownward,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  GridView,
  Tune,
  ZoomIn,
  ZoomOut,
  HomeOutlined,
  HomeRounded,
  HomeSharp,
  HomeTwoTone,
} from '@mui/icons-material';

// Explicit imports keep the bundle small (importing the whole icon set adds megabytes).
const Icons = { Home, Dashboard, Search, Settings, Person, People, Group, AccountCircle, Lock, LockOpen, Email, Inbox, Send, Chat, Notifications, NotificationsOff, CalendarMonth, Event, Schedule, AccessTime, Alarm, Today, Add, Remove, Edit, Delete, Save, Close, Check, Clear, Done, DoneAll, Refresh, Sync, Undo, Redo, ContentCopy, ContentPaste, ContentCut, Download, Upload, CloudUpload, CloudDownload, AttachFile, Link, Share, Print, Visibility, VisibilityOff, Favorite, FavoriteBorder, Star, StarBorder, ThumbUp, ThumbDown, Bookmark, BookmarkBorder, Flag, Info, Warning, Error, Help, CheckCircle, Cancel, Block, Report, ShoppingCart, Store, CreditCard, Payment, AttachMoney, Receipt, LocalShipping, Inventory, Sell, BarChart, PieChart, ShowChart, Timeline, TrendingUp, TrendingDown, Insights, Analytics, Leaderboard, Folder, FolderOpen, Description, Article, InsertDriveFile, Image, PictureAsPdf, VideoLibrary, MusicNote, Phone, Smartphone, Laptop, DesktopWindows, Tablet, Watch, Headphones, Keyboard, Mouse, Wifi, Bluetooth, Language, Public, Place, Map, Navigation, DarkMode, LightMode, Palette, Brush, Code, Terminal, BugReport, Build, Extension, Storage, Memory, Security, VerifiedUser, AdminPanelSettings, Logout, Login, Menu, MoreVert, MoreHoriz, ExpandMore, ExpandLess, ChevronLeft, ChevronRight, ArrowBack, ArrowForward, ArrowUpward, ArrowDownward, FilterList, Sort, ViewList, ViewModule, GridView, Tune, ZoomIn, ZoomOut, HomeOutlined, HomeRounded, HomeSharp, HomeTwoTone };
import { PageHeader } from '../../components/common';

// A curated list of commonly used Material icons (the full set has 2,000+).
const NAMES = [
  'Home', 'Dashboard', 'Search', 'Settings', 'Person', 'People', 'Group', 'AccountCircle', 'Lock', 'LockOpen', 'Email', 'Inbox',
  'Send', 'Chat', 'Notifications', 'NotificationsOff', 'CalendarMonth', 'Event', 'Schedule', 'AccessTime', 'Alarm', 'Today',
  'Add', 'Remove', 'Edit', 'Delete', 'Save', 'Close', 'Check', 'Clear', 'Done', 'DoneAll', 'Refresh', 'Sync', 'Undo', 'Redo',
  'ContentCopy', 'ContentPaste', 'ContentCut', 'Download', 'Upload', 'CloudUpload', 'CloudDownload', 'AttachFile', 'Link',
  'Share', 'Print', 'Visibility', 'VisibilityOff', 'Favorite', 'FavoriteBorder', 'Star', 'StarBorder', 'ThumbUp', 'ThumbDown',
  'Bookmark', 'BookmarkBorder', 'Flag', 'Info', 'Warning', 'Error', 'Help', 'CheckCircle', 'Cancel', 'Block', 'Report',
  'ShoppingCart', 'Store', 'CreditCard', 'Payment', 'AttachMoney', 'Receipt', 'LocalShipping', 'Inventory', 'Sell',
  'BarChart', 'PieChart', 'ShowChart', 'Timeline', 'TrendingUp', 'TrendingDown', 'Insights', 'Analytics', 'Leaderboard',
  'Folder', 'FolderOpen', 'Description', 'Article', 'InsertDriveFile', 'Image', 'PictureAsPdf', 'VideoLibrary', 'MusicNote',
  'Phone', 'Smartphone', 'Laptop', 'DesktopWindows', 'Tablet', 'Watch', 'Headphones', 'Keyboard', 'Mouse', 'Wifi', 'Bluetooth',
  'Language', 'Public', 'Place', 'Map', 'Navigation', 'DarkMode', 'LightMode', 'Palette', 'Brush', 'Code', 'Terminal',
  'BugReport', 'Build', 'Extension', 'Storage', 'Memory', 'Security', 'VerifiedUser', 'AdminPanelSettings', 'Logout', 'Login',
  'Menu', 'MoreVert', 'MoreHoriz', 'ExpandMore', 'ExpandLess', 'ChevronLeft', 'ChevronRight', 'ArrowBack', 'ArrowForward',
  'ArrowUpward', 'ArrowDownward', 'FilterList', 'Sort', 'ViewList', 'ViewModule', 'GridView', 'Tune', 'ZoomIn', 'ZoomOut',
].filter((n) => Icons[n]);

function IconTile({ name, onCopy }) {
  const theme = useTheme();
  const Icon = Icons[name];
  return (
    <Tooltip title={`<${name}Icon /> — click to copy`}>
      <Box
        onClick={() => onCopy(name)}
        sx={{
          cursor: 'pointer',
          p: 2,
          borderRadius: 2,
          textAlign: 'center',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all .15s',
          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'primary.main', borderColor: 'primary.main' },
        }}
      >
        <Icon />
        <Typography variant="caption" display="block" noWrap>{name}</Typography>
      </Box>
    </Tooltip>
  );
}
IconTile.propTypes = { name: PropTypes.string.isRequired, onCopy: PropTypes.func.isRequired };

// /ui/icons — searchable icon gallery
export const IconsPage = () => {
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const list = useMemo(() => NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase())), [query]);

  const copy = (name) => {
    const text = `import ${name}Icon from '@mui/icons-material/${name}';`;
    navigator.clipboard?.writeText(text).then(() => setToast(`Copied: ${text}`)).catch(() => setToast(text));
  };

  return (
    <Box>
      <PageHeader title="Icons" subtitle={`Material UI icons (${NAMES.length} shown). Click an icon to copy its import line.`} />
      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Icons.Search /></InputAdornment> }}
          />
          <Grid container spacing={1.5}>
            {list.map((n) => (
              <Grid key={n} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <IconTile name={n} onCopy={copy} />
              </Grid>
            ))}
          </Grid>
          {!list.length && <Typography color="text.secondary">No icons match “{query}”.</Typography>}
        </CardContent>
      </Card>
      <Snackbar open={Boolean(toast)} autoHideDuration={2500} onClose={() => setToast('')} message={toast} />
    </Box>
  );
};

// /ui/icons-test — sizes, colors and variants of the same icons
export const IconsTestPage = () => {
  const variants = ['Home', 'HomeOutlined', 'HomeRounded', 'HomeSharp', 'HomeTwoTone'];
  return (
    <Box>
      <PageHeader title="Icons Test" subtitle="The same icon in different sizes, colors and styles." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Sizes</Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                {['small', 'medium', 'large'].map((s) => (
                  <Box key={s} sx={{ textAlign: 'center' }}><Icons.Favorite fontSize={s} /><Typography variant="caption" display="block">{s}</Typography></Box>
                ))}
                <Box sx={{ textAlign: 'center' }}><Icons.Favorite sx={{ fontSize: 56 }} /><Typography variant="caption" display="block">56px</Typography></Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Colors</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {['primary', 'secondary', 'success', 'error', 'warning', 'info', 'disabled', 'action'].map((c) => (
                  <Box key={c} sx={{ textAlign: 'center' }}><Icons.Star color={c} /><Typography variant="caption" display="block">{c}</Typography></Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Styles</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {variants.filter((v) => Icons[v]).map((v) => {
                  const Icon = Icons[v];
                  return <Box key={v} sx={{ textAlign: 'center' }}><Icon fontSize="large" /><Typography variant="caption" display="block">{v.replace('Home', '') || 'Filled'}</Typography></Box>;
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
