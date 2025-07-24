import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
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
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon, Chat as ChatIcon, Mic as MicIcon, AttachFile as AttachFileIcon, Delete as DeleteIcon } from '@mui/icons-material';
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
  const theme = useTheme();
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

  // Status dot colors using Material-UI theme
  const statusColors = {
    Online: theme?.palette?.success?.main || '#28c76f',
    Away: theme?.palette?.warning?.main || '#ff9f43',
    'Do Not Disturb': theme?.palette?.error?.main || '#ea5455',
    Offline: theme?.palette?.text?.secondary || '#b9b9c3',
  };

  // Fetch chat data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
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

  const handleChatSelect = async (chat) => {
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setChats(updatedChats);
    setSelectedChat({ ...chat, unreadCount: 0 });
    setSelectedContact(null);
    setMessageInput('');
    // Update unread count in MongoDB
    try {
      const response = await fetch(`http://localhost:5001/api/chat/chats/${chat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...chat, unreadCount: 0 }),
      });
      if (!response.ok) throw new Error('Failed to update unread count');
    } catch (err) {
      console.error('Error updating unread count:', err);
    }
  };

  const handleContactSelect = async (contact) => {
    const tempChat = {
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

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      content: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    };

    if (selectedContact) {
      // Create a new chat
      const newChat = {
        ...selectedChat,
        messages: [newMessage],
      };
      try {
        const response = await fetch('http://localhost:5001/api/chat/chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newChat),
        });
        if (!response.ok) throw new Error('Failed to create chat');
        const createdChat = await response.json();
        setChats([createdChat, ...chats]);
        // Delete contact
        await fetch(`http://localhost:5001/api/chat/contacts/${selectedContact.id}`, {
          method: 'DELETE',
        });
        setContacts(contacts.filter((c) => c.id !== selectedContact.id));
        setSelectedContact(null);
        setSelectedChat(createdChat);
      } catch (err) {
        console.error('Error creating chat:', err);
      }
    } else {
      // Update existing chat
      try {
        const response = await fetch('http://localhost:5001/api/chat/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId: selectedChat.id, message: newMessage }),
        });
        if (!response.ok) throw new Error('Failed to send message');
        const updatedChat = await response.json();
        setChats(chats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)));
        setSelectedChat(updatedChat);
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }

    setMessageInput('');
  };

  const handleDeleteChat = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/chat/chats/${chatId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete chat');
      setChats(chats.filter((chat) => chat.id !== chatId));
      if (selectedChat?.id === chatId) setSelectedChat(null);
    } catch (err) {
      console.error('Error deleting chat:', err);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/chat/contacts/${contactId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      setContacts(contacts.filter((contact) => contact.id !== contactId));
      if (selectedContact?.id === contactId) setSelectedContact(null);
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
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
      <Box sx={getChatpageStyle('mainContainer', { theme })}>
        {/* User Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 360,
              boxSizing: 'border-box',
              backgroundColor: theme?.palette?.background?.paper || '#fff',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src="/user.png"
                sx={getChatpageStyle('userAvatar', { theme })}
                onError={() => console.log('Failed to load user avatar: /user.png')}
              />
              <Box>
                <Typography variant="h6" sx={{ color: theme?.palette?.text?.primary || '#5e5873' }}>
                  John Doe
                </Typography>
                <Typography variant="body2" sx={{ color: theme?.palette?.text?.secondary || '#b9b9c3' }}>
                  Admin
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Typography sx={getChatpageStyle('drawerTitle', { theme })}>
              About
            </Typography>
            <Typography sx={getChatpageStyle('drawerText', { theme })}>
              Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.
            </Typography>
            <Typography sx={getChatpageStyle('drawerTitle', { theme })}>
              Status
            </Typography>
            <FormControl fullWidth sx={getChatpageStyle('statusSelect', { theme })}>
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
            <Typography sx={getChatpageStyle('drawerTitle', { theme })}>
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
              sx={getChatpageStyle('settingsToggle', { theme })}
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
              sx={getChatpageStyle('settingsToggle', { theme })}
            />
            <Typography sx={getChatpageStyle('drawerTitle', { theme })}>
              Invite Friends
            </Typography>
            <Typography sx={getChatpageStyle('drawerText', { theme })}>
              Invite Friends
            </Typography>
            <Typography sx={getChatpageStyle('drawerTitle', { theme })}>
              Delete Account
            </Typography>
            <Typography sx={getChatpageStyle('drawerText', { theme })}>
              Delete Account
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={getChatpageStyle('logoutButton', { theme })}
            >
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Chat Sidebar */}
        <Box sx={getChatpageStyle('sidebar', { theme })}>
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
                      border: `2px solid ${theme?.palette?.background?.paper || '#fff'}`,
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
                startAdornment: <SearchIcon sx={{ color: theme?.palette?.text?.secondary || '#6e6b7b', mr: 1 }} />,
              }}
              sx={{ ...getChatpageStyle('searchField', { theme }), flexGrow: 1, ml: 2 }}
            />
          </Box>

          <Typography sx={getChatpageStyle('sectionTitle', { theme })}>
            Chats
          </Typography>
          <List>
            {chats.map((chat) => (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton
                  sx={getChatpageStyle('chatItem', { theme })}
                  onClick={() => handleChatSelect(chat)}
                  selected={selectedChat?.id === chat.id}
                >
                  <Avatar
                    src={chat.avatar}
                    sx={getChatpageStyle('avatar', { theme })}
                    onError={() => console.log(`Failed to load chat avatar for ${chat.name}: ${chat.avatar}`)}
                  >
                    {chat.name[0]}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Typography sx={getChatpageStyle('chatName', { theme })}>
                      {chat.name}
                    </Typography>
                    <Typography sx={getChatpageStyle('chatSnippet', { theme })}>
                      {chat.snippet}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography sx={getChatpageStyle('chatTime', { theme })}>
                      {chat.time}
                    </Typography>
                    {chat.unreadCount > 0 && (
                      <Badge
                        badgeContent={chat.unreadCount}
                        sx={getChatpageStyle('unreadBadge', { theme })}
                      />
                    )}
                  </Box>
                </ListItemButton>
                <Tooltip title="删除聊天">
                  <IconButton onClick={() => handleDeleteChat(chat.id)}>
                    <DeleteIcon sx={{ color: theme?.palette?.text?.secondary || '#6e6b7b' }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Typography sx={getChatpageStyle('sectionTitle', { theme })}>
            Contacts
          </Typography>
          <List>
            {contacts.map((contact) => (
              <ListItem key={contact.id} disablePadding>
                <ListItemButton
                  sx={getChatpageStyle('contactItem', { theme })}
                  onClick={() => handleContactSelect(contact)}
                  selected={selectedContact?.id === contact.id}
                >
                  <Avatar
                    src={contact.avatar}
                    sx={getChatpageStyle('contactAvatar', { color: contact.color, theme })}
                    onError={() => console.log(`Failed to load contact avatar for ${contact.name}: ${contact.avatar}`)}
                  >
                    {contact.initials}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Typography sx={getChatpageStyle('chatName', { theme })}>
                      {contact.name}
                    </Typography>
                    <Typography sx={getChatpageStyle('chatSnippet', { theme })}>
                      {contact.snippet}
                    </Typography>
                  </Box>
                </ListItemButton>
                <Tooltip title="删除联系人">
                  <IconButton onClick={() => handleDeleteContact(contact.id)}>
                    <DeleteIcon sx={{ color: theme?.palette?.text?.secondary || '#6e6b7b' }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={getChatpageStyle('content', { theme })}>
          {selectedChat ? (
            <>
              <Box sx={getChatpageStyle('chatHeader', { theme })}>
                <Avatar
                  src={selectedChat.avatar}
                  sx={getChatpageStyle('chatHeaderAvatar', { theme })}
                  onError={() => console.log(`Failed to load chat header avatar for ${selectedChat.name}: ${selectedChat.avatar}`)}
                >
                  {selectedChat.name[0]}
                </Avatar>
                <Box>
                  <Typography sx={getChatpageStyle('chatHeaderName', { theme })}>
                    {selectedChat.name}
                  </Typography>
                  <Typography sx={getChatpageStyle('chatHeaderStatus', { theme })}>
                    Friend - Developer
                  </Typography>
                </Box>
              </Box>
              <Box sx={getChatpageStyle('messageContainer', { theme })} ref={messageContainerRef}>
                {selectedChat.messages.map((message) => (
                  <Box key={message.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={getChatpageStyle('message', { isSent: message.sender === 'You', theme })}
                    >
                      {message.content}
                    </Box>
                    <Typography
                      sx={getChatpageStyle('messageTime', { isSent: message.sender === 'You', theme })}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={getChatpageStyle('inputContainer', { theme })}>
                <TextField
                  placeholder="Type your message here..."
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={4}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={getChatpageStyle('messageInput', { theme })}
                />
                <IconButton>
                  <MicIcon sx={{ color: theme?.palette?.text?.secondary || '#6e6b7b' }} />
                </IconButton>
                <IconButton>
                  <AttachFileIcon sx={{ color: theme?.palette?.text?.secondary || '#6e6b7b' }} />
                </IconButton>
                <Button
                  variant="contained"
                  sx={getChatpageStyle('sendButton', { theme })}
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
                  backgroundColor: theme?.palette?.background?.paper || '#fff',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ChatIcon sx={{ fontSize: 30, color: theme?.palette?.text?.secondary || '#6e6b7b' }} />
              </Box>
              <Button
                variant="contained"
                sx={getChatpageStyle('startButton', { theme })}
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