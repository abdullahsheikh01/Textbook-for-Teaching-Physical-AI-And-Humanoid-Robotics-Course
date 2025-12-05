---
name: frontend-dev-docusaurus-chatbot
description: Expert frontend development skill specializing in Docusaurus documentation sites and interactive chatbot UI components. Use when building or modifying documentation sites, creating chat interfaces, implementing real-time messaging UIs, or working with React-based conversational interfaces.
---

# Frontend Development - Docusaurus & Chatbot UI Specialist

## Overview
This skill provides expert guidance for building modern frontend applications with a focus on Docusaurus documentation sites and interactive chatbot user interfaces.

## Core Competencies

### 1. Docusaurus Development

#### Site Setup & Configuration
- Initialize Docusaurus projects with optimal configuration
- Configure `docusaurus.config.js` for multi-language support, versioning, and custom plugins
- Set up custom themes and color modes (light/dark)
- Implement custom CSS and component swizzling
- Configure sidebar navigation, navbar, and footer

#### Content Management
- Structure documentation with proper MD/MDX formatting
- Use frontmatter effectively for metadata and SEO
- Implement versioned documentation
- Create interactive code blocks with live code editors
- Add tabs, admonitions, and custom components

#### Advanced Features
- Build custom plugins for specialized functionality
- Implement Algolia DocSearch for site search
- Create custom pages with React components
- Set up internationalization (i18n)
- Optimize build performance and bundle size
- Configure deployment to Vercel, Netlify, or GitHub Pages

#### Best Practices
- Follow Docusaurus naming conventions and folder structure
- Use `@docusaurus/` scoped packages for official plugins
- Implement proper meta tags for SEO
- Create responsive layouts for mobile and desktop
- Maintain consistent documentation style guides

### 2. Interactive Chatbot UI Development

#### Core Chat Interface Components
- **Message List**: Virtualized scrolling for performance with large message histories
- **Message Bubbles**: Support for user/assistant/system message types
- **Input Area**: Auto-expanding textarea with character limits and send button
- **Typing Indicators**: Animated dots or skeleton loaders
- **Timestamps**: Relative time display (e.g., "2 minutes ago")
- **Avatar System**: User and bot avatars with fallback initials

#### Advanced Chat Features
- **Markdown Rendering**: Syntax highlighting for code blocks, support for tables, lists, and formatting
- **Code Blocks**: Copy button, language detection, line numbers
- **File Attachments**: Image previews, document uploads, drag-and-drop
- **Rich Media**: Support for images, videos, links with previews
- **Reactions**: Message reactions (thumbs up/down, emojis)
- **Message Actions**: Edit, delete, copy, regenerate
- **Thread Management**: Conversation branching and history

#### Real-Time & State Management
- WebSocket connections for live updates
- Optimistic UI updates for instant feedback
- Message queuing and retry logic
- Streaming responses (token-by-token display)
- Connection status indicators
- Local state persistence (localStorage/IndexedDB)

#### UI/UX Patterns
- Smooth auto-scroll to latest message
- Scroll-to-bottom button when not at bottom
- Loading states and skeleton screens
- Error handling with retry options
- Empty states and onboarding
- Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- Accessibility features (ARIA labels, keyboard navigation)

#### Styling Approaches
- Tailwind CSS utility classes for rapid development
- CSS Modules for component-scoped styles
- Styled-components for dynamic theming
- Responsive design with mobile-first approach
- Animation libraries (Framer Motion, React Spring)

## Technology Stack

### Primary Technologies
- **React** (v18+): Functional components with hooks
- **TypeScript**: Strong typing for maintainability
- **Docusaurus** (v3+): Latest stable version
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Modern icon library

### Common Libraries
- **react-markdown**: Markdown rendering in chat
- **react-syntax-highlighter**: Code syntax highlighting
- **react-virtualized** or **react-window**: Efficient list rendering
- **zustand** or **jotai**: Lightweight state management
- **react-hook-form**: Form handling
- **date-fns** or **dayjs**: Date formatting

## Implementation Guidelines

### Chatbot UI Architecture
```
src/
├── components/
│   ├── chat/
│   │   ├── ChatContainer.tsx       # Main chat wrapper
│   │   ├── MessageList.tsx         # Virtualized message list
│   │   ├── Message.tsx             # Individual message component
│   │   ├── MessageInput.tsx        # Input area with controls
│   │   ├── TypingIndicator.tsx    # Loading animation
│   │   └── MessageActions.tsx     # Copy, edit, delete buttons
│   └── common/
│       ├── Avatar.tsx
│       ├── Button.tsx
│       └── Icon.tsx
├── hooks/
│   ├── useChat.ts                 # Chat logic and state
│   ├── useWebSocket.ts            # WebSocket connection
│   └── useAutoScroll.ts           # Scroll behavior
├── types/
│   └── chat.ts                    # TypeScript interfaces
└── utils/
    ├── markdown.ts                # Markdown processing
    └── formatting.ts              # Text formatting helpers
```

### Performance Optimization
- Implement virtualization for message lists with 100+ messages
- Use React.memo() for message components to prevent unnecessary re-renders
- Debounce typing indicators
- Lazy load images and media
- Code-split large dependencies
- Optimize bundle size with tree-shaking

### Accessibility Standards
- Add proper ARIA labels for all interactive elements
- Ensure keyboard navigation works throughout the interface
- Provide screen reader announcements for new messages
- Maintain proper focus management
- Support high contrast mode
- Test with accessibility tools (axe, WAVE)

## Example Implementations

### Basic Message Component
```typescript
interface MessageProps {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isLoading?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  content,
  role,
  timestamp,
  isLoading
}) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <ReactMarkdown>{content}</ReactMarkdown>
        <span className="text-xs opacity-70 mt-2 block">
          {formatTimestamp(timestamp)}
        </span>
      </div>
    </div>
  );
};
```

### Docusaurus Custom Component in MDX
```mdx
---
title: Interactive Chat Demo
---

import ChatDemo from '@site/src/components/ChatDemo';

# Documentation with Live Chat

This page includes an interactive chatbot demonstration:

<ChatDemo 
  apiEndpoint="/api/chat"
  placeholder="Ask me anything about our docs..."
/>
```

## Common Patterns

### Streaming Response Handler
```typescript
const handleStreamingResponse = async (prompt: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' }
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let accumulatedText = '';

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    accumulatedText += chunk;
    
    // Update UI with accumulated text
    setMessages(prev => updateLastMessage(prev, accumulatedText));
  }
};
```

### Auto-scroll Behavior
```typescript
const useAutoScroll = (messages: Message[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    if (shouldAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, shouldAutoScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShouldAutoScroll(isAtBottom);
  };

  return { scrollRef, handleScroll };
};
```

## When to Use This Skill

Apply this skill when the task involves:
- Setting up or configuring Docusaurus documentation sites
- Building chat interfaces or messaging UIs
- Creating conversational AI frontends
- Implementing real-time messaging features
- Designing documentation with interactive components
- Optimizing chat UI performance
- Adding markdown rendering to chat applications
- Creating responsive, accessible chat experiences
- Integrating chatbots into existing web applications
- Building customer support chat widgets

## Output Standards

When implementing solutions:
1. Use TypeScript for type safety
2. Follow React best practices (hooks, functional components)
3. Implement proper error boundaries
4. Add loading and error states
5. Ensure mobile responsiveness
6. Include accessibility features
7. Write clean, maintainable code with comments
8. Optimize for performance
9. Follow the project's existing code style
10. Test on multiple browsers and devices