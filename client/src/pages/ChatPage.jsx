import React, { useState, useEffect, useRef } from 'react';
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
  Badge,
  IconButton,
  Drawer,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Search as SearchIcon, Chat as ChatIcon, Mic as MicIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import getChatpageStyle from '../styles/ChatpageStyle';

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

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageContainerRef = useRef(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState('Online');
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Status dot colors
  const statusColors = {
    Online: '#28c76f',
    Away: '#ff9f43',
    'Do Not Disturb': '#ea5455',
    Offline: '#b9b9c3',
  };

  // Fetch chat data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5001/api/chat', {
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Chat Data:', data);
        setChats(data.chats || []);
        setContacts(data.contacts || []);
      } catch (err) {
        setError(err);
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Scroll to the bottom of the message container when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [selectedChat]);

  const handleChatSelect = (chat) => {
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setChats(updatedChats);
    setSelectedChat({ ...chat, unreadCount: 0 });
    setSelectedContact(null);
    setMessageInput('');
  };

  const handleContactSelect = (contact) => {
    const tempChat = {
      id: contact.id + 1000,
      name: contact.name,
      avatar: contact.avatar,
      snippet: '',
      time: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      unreadCount: 0,
      messages: [],
    };
    setSelectedChat(tempChat);
    setSelectedContact(contact);
    setMessageInput('');
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: (selectedChat.messages.length + 1) * 1000 + Date.now(),
      sender: 'You',
      content: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      snippet: messageInput,
      time: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    if (selectedContact) {
      setChats([updatedChat, ...chats]);
      setContacts(contacts.filter((c) => c.id !== selectedContact.id));
      setSelectedContact(null);
    } else {
      setChats(chats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)));
    }

    setSelectedChat(updatedChat);
    setMessageInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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
    <ErrorBoundary>
      <Box sx={getChatpageStyle('mainContainer')}>
        {/* User Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 360,
              boxSizing: 'border-box',
              backgroundColor: '#fff',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src="/user.png"
                sx={getChatpageStyle('userAvatar')}
                onError={() => console.log('Failed to load user avatar: /user.png')}
              />
              <Box>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" color="textSecondary">Admin</Typography>
              </Box>
            </Box>
            <Divider />
            <Typography sx={getChatpageStyle('drawerTitle')}>
              About
            </Typography>
            <Typography sx={getChatpageStyle('drawerText')}>
              Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.
            </Typography>
            <Typography sx={getChatpageStyle('drawerTitle')}>
              Status
            </Typography>
            <FormControl fullWidth sx={getChatpageStyle('statusSelect')}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Away">Away</MenuItem>
                <MenuItem value="Do Not Disturb">Do Not Disturb</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={getChatpageStyle('drawerTitle')}>
              Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={twoStepVerification}
                  onChange={(e) => setTwoStepVerification(e.target.checked)}
                  color="primary"
                />
              }
              label="Two-step Verification"
              sx={getChatpageStyle('settingsToggle')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label="Notification"
              sx={getChatpageStyle('settingsToggle')}
            />
            <Typography sx={getChatpageStyle('drawerTitle')}>
              Invite Friends
            </Typography>
            <Typography sx={getChatpageStyle('drawerText')}>
              Invite Friends
            </Typography>
            <Typography sx={getChatpageStyle('drawerTitle')}>
              Delete Account
            </Typography>
            <Typography sx={getChatpageStyle('drawerText')}>
              Delete Account
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={getChatpageStyle('logoutButton')}
            >
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Chat Sidebar */}
        <Box sx={getChatpageStyle('sidebar')}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleDrawer(true)}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: statusColors[status],
                      border: '2px solid #fff',
                    }}
                  />
                }
              >
                <Avatar
                  src="/user.png"
                  sx={{ width: 40, height: 40 }}
                  onError={() => console.log('Failed to load user avatar: /user.png')}
                />
              </Badge>
            </IconButton>
            <TextField
              placeholder="Search for contact..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: '#6e6b7b', mr: 1 }} />,
              }}
              sx={{ ...getChatpageStyle('searchField'), flexGrow: 1, ml: 2 }}
            />
          </Box>

          <Typography sx={getChatpageStyle('sectionTitle')}>
            Chats
          </Typography>
          <List>
            {chats.map((chat) => (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton
                  sx={getChatpageStyle('chatItem')}
                  onClick={() => handleChatSelect(chat)}
                  selected={selectedChat?.id === chat.id}
                >
                  <Avatar
                    src={chat.avatar}
                    sx={getChatpageStyle('avatar')}
                    onError={() => console.log(`Failed to load chat avatar for ${chat.name}: ${chat.avatar}`)}
                  >
                    {chat.name[0]}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Typography sx={getChatpageStyle('chatName')}>
                      {chat.name}
                    </Typography>
                    <Typography sx={getChatpageStyle('chatSnippet')}>
                      {chat.snippet}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography sx={getChatpageStyle('chatTime')}>
                      {chat.time}
                    </Typography>
                    {chat.unreadCount > 0 && (
                      <Badge
                        badgeContent={chat.unreadCount}
                        sx={getChatpageStyle('unreadBadge')}
                      />
                    )}
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Typography sx={getChatpageStyle('sectionTitle')}>
            Contacts
          </Typography>
          <List>
            {contacts.map((contact) => (
              <ListItem key={contact.id} disablePadding>
                <ListItemButton
                  sx={getChatpageStyle('contactItem')}
                  onClick={() => handleContactSelect(contact)}
                  selected={selectedContact?.id === contact.id}
                >
                  <Avatar
                    src={contact.avatar}
                    sx={getChatpageStyle('contactAvatar', { color: contact.color })}
                    onError={() => console.log(`Failed to load contact avatar for ${contact.name}: ${contact.avatar}`)}
                  >
                    {contact.initials}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Typography sx={getChatpageStyle('chatName')}>
                      {contact.name}
                    </Typography>
                    <Typography sx={getChatpageStyle('chatSnippet')}>
                      {contact.snippet}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={getChatpageStyle('content')}>
          {selectedChat ? (
            <>
              <Box sx={getChatpageStyle('chatHeader')}>
                <Avatar
                  src={selectedChat.avatar}
                  sx={getChatpageStyle('chatHeaderAvatar')}
                  onError={() => console.log(`Failed to load chat header avatar for ${selectedChat.name}: ${selectedChat.avatar}`)}
                >
                  {selectedChat.name[0]}
                </Avatar>
                <Box>
                  <Typography sx={getChatpageStyle('chatHeaderName')}>
                    {selectedChat.name}
                  </Typography>
                  <Typography sx={getChatpageStyle('chatHeaderStatus')}>
                    Friend - Developer
                  </Typography>
                </Box>
              </Box>
              <Box sx={getChatpageStyle('messageContainer')} ref={messageContainerRef}>
                {selectedChat.messages.map((message) => (
                  <Box key={message.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={getChatpageStyle('message', { isSent: message.sender === 'You' })}
                    >
                      {message.content}
                    </Box>
                    <Typography
                      sx={getChatpageStyle('messageTime', { isSent: message.sender === 'You' })}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={getChatpageStyle('inputContainer')}>
                <TextField
                  placeholder="Type your message here..."
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={4}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={getChatpageStyle('messageInput')}
                />
                <IconButton>
                  <MicIcon />
                </IconButton>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <Button
                  variant="contained"
                  sx={getChatpageStyle('sendButton')}
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ChatIcon sx={{ fontSize: 30, color: '#6e6b7b' }} />
              </Box>
              <Button
                variant="contained"
                sx={getChatpageStyle('startButton')}
              >
                Start Conversation
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default ChatPage;