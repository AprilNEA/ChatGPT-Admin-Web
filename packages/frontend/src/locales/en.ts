import { TITLE } from '@/locales/cn';

import type { LocaleType } from './index';

const en: LocaleType = {
  // Auth Page
  Auth: {
    Submit: 'Submit',
    Email: 'Email',
    Phone: 'Phone',
    Code: 'Verification Code',
    GetCode: 'Get Code',
    WeChat: 'WeChat',
    Username: 'Username',
    Password: 'Password',
    Login: (type?: string) => `${type ?? ''} Login`,
    Register: (type?: string) => `${type ?? ''} Register`,
    Sent: (ttl: number) => `Sent (${ttl}s)`,
  },
  // Index Page
  Index: {
    Title: TITLE,
    SubTitle: 'Welcome to follow WeChat official account:',
    PremiumLimit: (count: number) => `Currently available: ${count} items`,
    UpgradePremium: 'Upgrade to Premium',
    WelcomeTitle: `Welcome to ${TITLE}`,
    WelcomeMessage:
      'Hello, I am ChatGPT, an artificial intelligence assistant based on the GPT-3.5 architecture. I am designed to answer various questions, provide information, offer suggestions, and engage in conversation with you. I have knowledge on a variety of topics and can communicate with you in multiple languages. If you have any questions or need assistance, feel free to ask me, and I will do my best to provide you with the required information and support.',
    Return: 'Return',
    WelcomeCaption: 'Click the button below to start chatting!',
  },
  Premium: {
    Title: '升级到高级版',
    SubTitle: '高级版可以获取提升使用次数并获取GPT-4访问权限',
  },
  UnknownError: 'Unknown error, please contact the administrator',
  WIP: 'This feature is still under development...',
  Error: {
    Unauthorized:
      'You are currently not logged in, please refresh your browser cache and log in.',
    TooManyRequests:
      'You have reached the maximum number of requests in three hours for your account. Please try again later. \n If you need more usage, you can check the paid plans in user information.',
    TooFastRequests: 'Requesting too fast, wait a moment (5 seconds interval).',
    ContentBlock:
      'Please check the text for sensitive words. If there are any mistakes, please contact customer service.',
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} conversations`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} conversations with ${TITLE}`,
    Actions: {
      ChatList: 'View Message List',
      CompressedHistory: 'View Compressed History Prompt',
      Export: 'Export Chat History',
      Copy: 'Copy',
      Stop: 'Stop',
      Retry: 'Retry',
    },
    Typing: 'Typing...',
    Input: (submitKey: string) => `Type a message, ${submitKey} to send`,
    Send: 'Send',
  },
  Profile: {
    Title: 'User Information',
    SubTitle: 'View and edit user information',
    Username: 'Username',
    Email: 'Email',
    Phone: 'Phone Number',
    Avatar: 'Change Avatar',
    Plan: {
      Title: 'Plan',
    },
    Invite: {
      Title: 'Invite Others',
      SubTitle:
        'Successfully inviting others can get reset counts and recharge discounts',
      Code: 'Invitation Code',
      InviteLink: 'Invitation Link',
      CopyInviteLink: 'Copy Invitation Link',
      InviteeNumber: 'Current number of invitees',
    },
    Upgrade: 'Upgrade',
    Reset: {
      Title: 'Reset Current Limit',
      SubTitle: 'Can clear the message count limit for a fixed period',
      Click: (t: number) => `Clear once Remaining: ${t}`,
    },
    RateLimit: {
      Title: (t: number) => `Message Count Limit in Fixed Period (${t} hours)`,
      TitleFree: 'Message Count Limit in Fixed Period',
      Subtitle:
        'Total number of requested messages Click to view specific request times',
      Interval: 'Request Interval',
      IntervalDesp: 'How often you can make a request',
    },
  },
  Export: {
    Title: 'Export Chat History as Markdown',
    Copy: 'Copy All',
    Download: 'Download File',
  },
  Memory: {
    Title: 'Context Memory Prompt',
    EmptyContent: 'Nothing remembered yet',
    Copy: 'Copy All',
  },
  Home: {
    NewChat: 'New Chat',
    DeleteChat: 'Confirm delete selected conversation?',
  },
  Settings: {
    Title: 'Settings',
    SubTitle: 'Settings Options',
    Actions: {
      ClearAll: 'Clear All Data',
      ResetAll: 'Reset All Options',
      Close: 'Close',
    },
    Lang: {
      Name: 'Language',
      Options: {
        cn: 'Chinese',
        en: 'English',
      },
    },
    Avatar: 'Avatar',
    Account: 'Account',
    Update: {
      Version: (x: string) => `Current Version: ${x}`,
      IsLatest: 'Is the Latest Version',
      CheckUpdate: 'Check for Updates',
      IsChecking: 'Checking for Updates...',
      FoundUpdate: (x: string) => `New Version Found: ${x}`,
      GoToUpdate: 'Go to Update',
    },
    SendKey: 'Send Key',
    Theme: 'Theme',
    TightBorder: 'Tight Border',
    HistoryCount: {
      Title: 'History Messages Count',
      SubTitle: 'Number of history messages carried with each request',
    },
    CompressThreshold: {
      Title: 'Compression Threshold for History Messages',
      SubTitle:
        'When the length of uncompressed history messages exceeds this value, compression will occur',
    },
    Token: {
      Title: 'API Key',
      SubTitle: 'Using your own Key can bypass controlled access restrictions',
      Placeholder: 'OpenAI API Key',
    },
    AccessCode: {
      Title: 'Access Code',
      SubTitle: 'Currently in controlled access state',
      Placeholder: 'Please enter the access code',
    },
    Model: 'Model',
    Temperature: {
      Title: 'Randomness (temperature)',
      SubTitle: 'The higher the value, the more random the response',
    },
    MaxTokens: {
      Title: 'Limit per Reply (max_tokens)',
      SubTitle: 'Maximum number of Tokens used in a single interaction',
    },
    PresencePenlty: {
      Title: 'Topic Novelty (presence_penalty)',
      SubTitle: 'The higher the value, the more likely to expand to new topics',
    },
  },
  Store: {
    DefaultTopic: 'New Chat',
    BotHello: 'How can I help you?',
    Error: 'Error occurred, please try again later',
    Prompt: {
      History: (content: string) =>
        'This is a summary of the history of the conversation between ai and the user as a prologue:' +
        content,
      Topic:
        "Directly return a brief topic of this sentence, do not explain, if there is no topic, directly return 'Casual Chat'",
      Summarize:
        'Briefly summarize your conversation with the user, to be used as a context prompt for subsequent interactions, keep it within 50 characters',
    },
    ConfirmClearAll: 'Confirm to clear all chat and settings data?',
  },
  Copy: {
    Success: 'Copied to clipboard',
    Failed: 'Copy failed, please grant permission to access clipboard',
  },
};

export default en;
