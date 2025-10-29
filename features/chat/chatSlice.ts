import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initialConversations from '@/mock/chat.json';
import type { Conversation, ConversationType, Message } from '@/lib/types';

type ChatState = {
  conversations: Conversation[];
  activeConversationId?: string;
  activeTab: ConversationType;
  search: string;
};

const initialState: ChatState = {
  conversations: initialConversations as Conversation[],
  activeConversationId: 'conversation-1',
  activeTab: 'booking',
  search: ''
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation(state, action: PayloadAction<string | undefined>) {
      state.activeConversationId = action.payload;
    },
    setActiveTab(state, action: PayloadAction<ConversationType>) {
      state.activeTab = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    addMessage(state, action: PayloadAction<{ conversationId: string; message: Message }>) {
      const conversation = state.conversations.find((conv) => conv.id === action.payload.conversationId);
      if (conversation) {
        conversation.messages.push(action.payload.message);
      }
    },
    toggleAi(state, action: PayloadAction<{ conversationId: string }>) {
      const conversation = state.conversations.find((conv) => conv.id === action.payload.conversationId);
      if (conversation) {
        conversation.aiEnabled = !conversation.aiEnabled;
      }
    }
  }
});

export const { setActiveConversation, setActiveTab, setSearch, addMessage, toggleAi } =
  chatSlice.actions;
export default chatSlice.reducer;
