import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Avatar,
  Divider,
  Button,
  CircularProgress,
  Checkbox,
  IconButton,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
} from '@mui/material';
import {
  Email as EmailIcon,
  Send as SendIcon,
  Edit as DraftIcon,
  Star as StarIcon,
  Report as SpamIcon,
  Delete as TrashIcon,
  Search as SearchIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import getEmailPageStyle from '../styles/getEmailPageStyle'; // Import the styles

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography color="error">Something went wrong.</Typography>;
    }
    return this.props.children;
  }
}

// Utility functions for sorting
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

// Custom Toolbar for selected emails
const EnhancedTableToolbar = ({ numSelected, onAction }) => {
  return (
    <Toolbar sx={getEmailPageStyle('enhancedTableToolbar')}>
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
        {numSelected} selected
      </Typography>
      <Tooltip title="Reply">
        <IconButton onClick={() => onAction('reply')}>
          <ReplyIcon sx={getEmailPageStyle('actionIcon')} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Forward">
        <IconButton onClick={() => onAction('forward')}>
          <ForwardIcon sx={getEmailPageStyle('actionIcon')} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => onAction('delete')}>
          <DeleteIcon sx={getEmailPageStyle('actionIcon')} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

// Icon mapping for tabs
const iconMap = {
  EmailIcon: <EmailIcon />,
  SendIcon: <SendIcon />,
  DraftIcon: <DraftIcon />,
  StarIcon: <StarIcon />,
  SpamIcon: <SpamIcon />,
  TrashIcon: <TrashIcon />,
};

const EmailPage = () => {
    const { tab, labelName } = useParams();
    const navigate = useNavigate();
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [hoveredEmail, setHoveredEmail] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('sender');
    const [emails, setEmails] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [labels, setLabels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const selectedTab = tab || (labelName ? `label/${labelName}` : 'inbox');
  
    // Fetch email data
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const emailsResponse = await fetch('http://localhost:5001/api/email/emails', {
            mode: 'cors',
          });
          if (!emailsResponse.ok) {
            throw new Error(`HTTP error! Status: ${emailsResponse.status}`);
          }
          const emailsData = await emailsResponse.json();
          console.log('Emails:', emailsData); // Log emails
          console.log('Sent Emails:', emailsData.filter((email) => email.tab.includes('sent'))); // Log sent emails
          setEmails(emailsData);
  
          const tabsResponse = await fetch('http://localhost:5001/api/email/tabs', {
            mode: 'cors',
          });
          if (!tabsResponse.ok) {
            throw new Error(`HTTP error! Status: ${tabsResponse.status}`);
          }
          const tabsData = await tabsResponse.json();
          console.log('Tabs:', tabsData); // Log tabs
          setTabs(tabsData.map((tab) => ({
            ...tab,
            icon: iconMap[tab.icon],
          })));
  
          const labelsResponse = await fetch('http://localhost:5001/api/email/labels', {
            mode: 'cors',
          });
          if (!labelsResponse.ok) {
            throw new Error(`HTTP error! Status: ${labelsResponse.status}`);
          }
          const labelsData = await labelsResponse.json();
          setLabels(labelsData);
        } catch (err) {
          setError(err);
          console.error('Fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);// Empty dependency array to fetch data once on mount

  const headCells = [
    { id: 'sender', numeric: false, disablePadding: true, label: 'Sender' },
    { id: 'subject', numeric: false, disablePadding: false, label: 'Subject' },
    { id: 'time', numeric: true, disablePadding: false, label: 'Time' },
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectEmail = (emailId) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAllClick = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map((email) => email.id));
    }
  };

  const handleAction = (action) => {
    console.log(`Action: ${action} on selected emails:`, selectedEmails);
    // Implement action logic here (e.g., delete via API)
  };

  const handleTabChange = (value) => {
    if (value.startsWith('label/')) {
      const label = value.split('/')[1];
      navigate(`/apps/email/label/${label}`);
    } else {
      navigate(`/apps/email/${value}`);
    }
    setSelectedEmails([]); // Reset selection on tab change
  };

  // Filter emails based on the current tab or label
  const filteredEmails = emails?.filter((email) => {
    if (selectedTab.startsWith('label/')) {
      const label = selectedTab.split('/')[1];
      return email.labels.includes(label);
    }
    return Array.isArray(email.tab) ? email.tab.includes(selectedTab) : email.tab === selectedTab;
  }) || [];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Box sx={getEmailPageStyle('mainContainer')}>
        {/* Email Sidebar */}
        <Box sx={getEmailPageStyle('sidebar')}>
          <Box sx={{ p: 2 }}>
            <Button variant="contained" sx={getEmailPageStyle('composeButton')}>
              Compose
            </Button>
          </Box>
          <List>
            {tabs.map((tab) => (
              <ListItem key={tab.value} disablePadding>
                <ListItemButton
                  selected={selectedTab === tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  sx={getEmailPageStyle('navItem', { selected: selectedTab === tab.value })}
                >
                  <ListItemIcon sx={getEmailPageStyle('navIcon', { selected: selectedTab === tab.value })}>
                    {tab.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={tab.label}
                    primaryTypographyProps={{
                      sx: getEmailPageStyle('navText', { selected: selectedTab === tab.value }),
                    }}
                  />
                  {tab.count && (
                    <Box sx={getEmailPageStyle('tabCount')}>
                      <Typography variant="caption">{tab.count}</Typography>
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={getEmailPageStyle('labelsSection')}>
            <Typography variant="caption" sx={getEmailPageStyle('labelsTitle')}>
              LABELS
            </Typography>
            <List>
              {labels.map((label) => (
                <ListItem key={label.label} disablePadding>
                  <ListItemButton
                    sx={getEmailPageStyle('labelItem', { selected: selectedTab === `label/${label.label.toLowerCase()}` })}
                    onClick={() => handleTabChange(`label/${label.label.toLowerCase()}`)}
                  >
                    <Box sx={getEmailPageStyle('labelDot', { color: label.color })} />
                    <ListItemText
                      primary={label.label}
                      primaryTypographyProps={{
                        sx: getEmailPageStyle('labelText', { selected: selectedTab === `label/${label.label.toLowerCase()}` }),
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Email Page (Main Content) */}
        <Box sx={getEmailPageStyle('content')}>
          {/* Breadcrumbs */}
          {/* <Box sx={getEmailPageStyle('breadcrumbs')}>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography sx={getEmailPageStyle('breadcrumbItem')}>
                Apps
              </Typography>
              <Typography sx={getEmailPageStyle('breadcrumbItem', { active: true })}>
                Email
              </Typography>
            </Breadcrumbs>
          </Box> */}
          {/* Search Bar */}
          <Box sx={getEmailPageStyle('searchBarContainer')}>
            <TextField
              placeholder="Search mail"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: '#6e6b7b', mr: 1 }} />,
              }}
              sx={getEmailPageStyle('searchField')}
            />
          </Box>
          {/* Email List with Sorting & Selecting */}
          <Box sx={getEmailPageStyle('emailList')}>
            {selectedEmails.length > 0 && (
              <EnhancedTableToolbar numSelected={selectedEmails.length} onAction={handleAction} />
            )}
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={selectedEmails.length > 0 && selectedEmails.length < filteredEmails.length}
                        checked={filteredEmails.length > 0 && selectedEmails.length === filteredEmails.length}
                        onChange={handleSelectAllClick}
                        sx={getEmailPageStyle('emailCheckbox')}
                      />
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Typography variant="body2" sx={{ color: '#6e6b7b' }}></Typography>
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => handleRequestSort(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box component="span" sx={{ display: 'none' }}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(filteredEmails, getComparator(order, orderBy)).map((email) => {
                    const isItemSelected = selectedEmails.includes(email.id);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={email.id}
                        selected={isItemSelected}
                        onMouseEnter={() => setHoveredEmail(email.id)}
                        onMouseLeave={() => setHoveredEmail(null)}
                        sx={getEmailPageStyle('emailItem')}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={() => handleSelectEmail(email.id)}
                            sx={getEmailPageStyle('emailCheckbox')}
                          />
                        </TableCell>
                        <TableCell padding="checkbox">
                          <IconButton
                            size="small"
                            onClick={() => {
                              email.starred = !email.starred;
                            }}
                          >
                            <StarIcon
                              sx={getEmailPageStyle('emailStarIcon', { starred: email.starred })}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={getEmailPageStyle('emailAvatar')}>
                              {email.sender[0]}
                            </Avatar>
                            <Typography variant="body2" sx={getEmailPageStyle('emailSender')}>
                              {email.sender}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {/* <Typography variant="body2" sx={getEmailPageStyle('emailSubject')}>
                            {email.subject}
                          </Typography> */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" sx={getEmailPageStyle('emailSnippet')}>
                              {email.snippet}
                            </Typography>
                            <Box sx={getEmailPageStyle('emailLabels')}>
                              {email.labels.map((label, idx) => (
                                <Box
                                  key={idx}
                                  sx={getEmailPageStyle('emailLabelDot', {
                                    color: labels.find((l) => l.label.toLowerCase() === label)?.color,
                                  })}
                                />
                              ))}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={getEmailPageStyle('emailActions')}>
                            <Typography variant="caption" sx={getEmailPageStyle('emailTime')}>
                              {email.time}
                            </Typography>
                            {hoveredEmail === email.id && selectedEmails.length === 0 && (
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small">
                                  <ReplyIcon sx={getEmailPageStyle('actionIcon')} />
                                </IconButton>
                                <IconButton size="small">
                                  <ForwardIcon sx={getEmailPageStyle('actionIcon')} />
                                </IconButton>
                                <IconButton size="small">
                                  <DeleteIcon sx={getEmailPageStyle('actionIcon')} />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default EmailPage;