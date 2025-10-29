import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initialTemplates from '@/mock/templates.json';
import type { Template } from '@/lib/types';

type TemplatesState = {
  items: Template[];
  activeTemplateId?: string;
};

const initialState: TemplatesState = {
  items: initialTemplates as Template[],
  activeTemplateId: 'template-1'
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setActiveTemplate(state, action: PayloadAction<string | undefined>) {
      state.activeTemplateId = action.payload;
    },
    updateTemplate(state, action: PayloadAction<Template>) {
      const index = state.items.findIndex((template) => template.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
    restoreTemplate(state, action: PayloadAction<string>) {
      const original = (initialTemplates as Template[]).find((template) => template.id === action.payload);
      if (original) {
        const index = state.items.findIndex((template) => template.id === action.payload);
        if (index >= 0) {
          state.items[index] = original;
        }
      }
    }
  }
});

export const { setActiveTemplate, updateTemplate, restoreTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;
