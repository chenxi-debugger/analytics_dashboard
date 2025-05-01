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
    // Clear the unreadCount for the selected chat
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setChats(updatedChats);
    setSelectedChat({ ...chat, unreadCount: 0 }); // Update selectedChat to reflect the change
    setSelectedContact(null);
    setMessageInput('');

    // Optionally, update the backend to persist the unreadCount change
    // fetch('http://localhost:5001/api/chat/update-unread', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ chatId: chat.id, unreadCount: 0 }),
    // });
  };

  const handleContactSelect = (contact) => {
    const tempChat = {
      id: contact.id + 1000,
      name: contact.name,
      avatar: '',
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
        {/* Chat Sidebar */}
        <Box sx={getChatpageStyle('sidebar')}>
          <Box sx={getChatpageStyle('searchBarContainer')}>
            <TextField
              placeholder="Search for contact..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: '#6e6b7b', mr: 1 }} />,
              }}
              sx={getChatpageStyle('searchField')}
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
                  <Avatar src={chat.avatar} sx={getChatpageStyle('avatar')}>
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
                  <Avatar sx={getChatpageStyle('contactAvatar', { color: contact.color })}>
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
              {/* Chat Header */}
              <Box sx={getChatpageStyle('chatHeader')}>
                <Avatar src={selectedChat.avatar} sx={getChatpageStyle('chatHeaderAvatar')}>
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

              {/* Messages */}
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

              {/* Message Input */}
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
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<ChatIcon />}
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