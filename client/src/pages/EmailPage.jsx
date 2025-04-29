import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
} from '@mui/material';
import {
  Email as EmailIcon,
  Send as SendIcon,
  Edit as DraftIcon,
  Star as StarIcon,
  Report as SpamIcon,
  Delete as TrashIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import getEmailPageStyle from '../styles/EmailPageStyle';

const EmailPage = () => {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [hoveredEmail, setHoveredEmail] = useState(null);

  // Fetch userAccount data and transform into email-like format
  const { data: emails, isLoading, error } = useQuery({
    queryKey: ['userAccounts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/user-account', {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log('API Response:', JSON.stringify(result, null, 2));

      const userAccounts = result?.pageProps?.invoiceData || []; // Note: Using invoiceData key as per API structure, but treating as userAccount data
      if (userAccounts.length === 0) {
        console.warn('No user account data found');
      }

      // Hardcode email data to match the image
      const hardcodedEmails = [
        {
          id: 1,
          sender: 'Tommy Sicilia',
          subject: 'How to Succeed with Your Shopify Store',
          snippet: 'How to Succeed with Your Shopify Store',
          time: '11:46 PM',
          labels: ['private'],
          starred: false,
        },
        {
          id: 2,
          sender: 'Tressa Gass',
          subject: 'Please find attached the latest Company Report',
          snippet: 'Please find attached the latest Company Report',
          time: '11:55 PM',
          labels: ['company', 'private'],
          starred: true,
        },
        {
          id: 3,
          sender: 'Louetta Esses',
          subject: 'Update Can Change Your Personal Life',
          snippet: 'Update Can Change Your Personal Life',
          time: '01:04 AM',
          labels: ['important'],
          starred: false,
        },
        {
          id: 4,
          sender: 'Waldemar Mannering',
          subject: 'Refer friends. Get rewards.',
          snippet: 'Refer friends. Get rewards.',
          time: '03:02 AM',
          labels: ['private'],
          starred: false,
        },
        {
          id: 5,
          sender: 'Eb Begg',
          subject: 'App Update',
          snippet: 'App Update',
          time: '03:12 PM',
          labels: ['company'],
          starred: false,
        },
        {
          id: 6,
          sender: 'Modestine Spat',
          subject: 'Password Reset',
          snippet: 'Password Reset',
          time: '04:25 AM',
          labels: ['company'],
          starred: false,
        },
        {
          id: 7,
          sender: 'Ardis Balderson',
          subject: 'Bank transfer initiated.',
          snippet: 'Bank transfer initiated.',
          time: '02:06 AM',
          labels: ['company'],
          starred: true,
        },
        {
          id: 8,
          sender: 'Dalila Ouldcott',
          subject: 'Order Feedback',
          snippet: 'Order Feedback',
          time: '08:36 AM',
          labels: ['personal'],
          starred: false,
        },
        {
          id: 9,
          sender: 'Lockwood Kubicek',
          subject: 'Finally Start Running',
          snippet: 'Finally Start Running',
          time: '08:36 AM',
          labels: ['private'],
          starred: false,
        },
        {
          id: 10,
          sender: 'Milena Osgarby',
          subject: 'Eco Food',
          snippet: 'Eco Food',
          time: '08:36 AM',
          labels: ['important'],
          starred: false,
        },
        {
          id: 11,
          sender: 'Phoebee Buffay',
          subject: 'Personal Insurance',
          snippet: 'Personal Insurance',
          time: '08:36 AM',
          labels: ['personal'],
          starred: false,
        },
        {
          id: 12,
          sender: 'Gabriel Abramow',
          subject: 'Forgot your password?',
          snippet: 'Forgot your password?',
          time: '08:36 AM',
          labels: ['company'],
          starred: false,
        },
        {
          id: 13,
          sender: 'Temple Olrenshaw',
          subject: 'April Fools Day Movies',
          snippet: 'April Fools Day Movies',
          time: '08:36 AM',
          labels: ['company'],
          starred: false,
        },
      ];

      return hardcodedEmails.map((email, index) => {
        const account = userAccounts[index % userAccounts.length] || {};
        let label;
        // Use country for labeling instead of invoiceStatus
        switch (account.country?.toLowerCase() || 'unknown') {
          case 'usa':
            label = 'personal';
            break;
          case 'haiti':
            label = 'company';
            break;
          case 'denmark':
            label = 'important';
            break;
          default:
            label = 'private';
        }

        return {
          ...email,
          labels: [label],
        };
      });
    },
  });

  const tabs = [
    { label: 'Inbox', value: 'inbox', count: 3, icon: <EmailIcon /> },
    { label: 'Sent', value: 'sent', icon: <SendIcon /> },
    { label: 'Draft', value: 'draft', count: 4, icon: <DraftIcon /> },
    { label: 'Starred', value: 'starred', icon: <StarIcon /> },
    { label: 'Spam', value: 'spam', count: 2, icon: <SpamIcon /> },
    { label: 'Trash', value: 'trash', icon: <TrashIcon /> },
  ];

  const labels = [
    { label: 'Personal', color: '#28c76f' },
    { label: 'Company', color: '#00cfe8' },
    { label: 'Important', color: '#ff9f43' },
    { label: 'Private', color: '#ea5455' },
  ];

  const handleSelectEmail = (emailId) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

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
    <Box sx={getEmailPageStyle('mainContainer')}>
      {/* Email Sidebar */}
      <Box sx={getEmailPageStyle('sidebar')}>
        <List>
          {tabs.map((tab) => (
            <ListItem key={tab.value} disablePadding>
              <ListItemButton
                selected={selectedTab === tab.value}
                onClick={() => setSelectedTab(tab.value)}
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
                <ListItemButton sx={getEmailPageStyle('labelItem')}>
                  <Box sx={getEmailPageStyle('labelDot', { color: label.color })} />
                  <ListItemText
                    primary={label.label}
                    primaryTypographyProps={{
                      sx: getEmailPageStyle('labelText'),
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
        {/* Header */}
        <Box sx={getEmailPageStyle('header')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" sx={getEmailPageStyle('composeButton')}>
              Compose
            </Button>
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
        </Box>
        <Divider />
        {/* Tabs Actions */}
        <Box sx={getEmailPageStyle('tabsContainer')}>
          <Box /> {/* Placeholder to push actions to the right */}
          <Box sx={getEmailPageStyle('tabsActions')}>
            <IconButton size="small">
              <RefreshIcon sx={{ fontSize: '20px', color: '#6e6b7b' }} />
            </IconButton>
            <IconButton size="small">
              <MoreVertIcon sx={{ fontSize: '20px', color: '#6e6b7b' }} />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        {/* Email List */}
        <Box sx={getEmailPageStyle('emailList')}>
          {emails?.length > 0 ? (
            emails.map((email) => (
              <Box key={email.id}>
                <Box
                  sx={getEmailPageStyle('emailItem')}
                  onMouseEnter={() => setHoveredEmail(email.id)}
                  onMouseLeave={() => setHoveredEmail(null)}
                >
                  <Checkbox
                    size="small"
                    checked={selectedEmails.includes(email.id)}
                    onChange={() => handleSelectEmail(email.id)}
                    sx={getEmailPageStyle('emailCheckbox')}
                  />
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
                  <Avatar sx={getEmailPageStyle('emailAvatar')}>
                    {email.sender[0]}
                  </Avatar>
                  <Box sx={getEmailPageStyle('emailContent')}>
                    <Box sx={getEmailPageStyle('emailHeader')}>
                      <Typography variant="body2" sx={getEmailPageStyle('emailSender')}>
                        {email.sender}
                      </Typography>
                      <Box sx={getEmailPageStyle('emailActions')}>
                        <Typography variant="caption" sx={getEmailPageStyle('emailTime')}>
                          {email.time}
                        </Typography>
                        {hoveredEmail === email.id && (
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
                    </Box>
                    <Typography variant="body2" sx={getEmailPageStyle('emailSubject')}>
                      {email.subject}
                    </Typography>
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
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', padding: 2 }}>
              No emails available
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmailPage;