import { LLMModel } from "../client/api";
import { getClientConfig } from "../config/client";
import { DEFAULT_INPUT_TEMPLATE, DEFAULT_MODELS, StoreKey } from "../constant";
import { createPersistStore } from "../utils/store";

//a5470
//midjourney功能 start
import { create } from "zustand";
import { persist } from "zustand/middleware";
//midjourney功能 over

export type ModelType = (typeof DEFAULT_MODELS)[number]["name"];

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

export const DEFAULT_CONFIG = {
  lastUpdate: Date.now(), // timestamp, to merge state

  submitKey: SubmitKey.CtrlEnter as SubmitKey,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto as Theme,
  tightBorder: !!getClientConfig()?.isApp,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: 300,

  disablePromptHint: false,
  //a5470
  //midjourney功能start
  useMjImgSelfProxy:false,
  //midjourney功能over

  dontShowMaskSplashScreen: false, // dont show splash screen when create chat
  hideBuiltinMasks: false, // dont add builtin masks

  customModels: "",
  models: DEFAULT_MODELS as any as LLMModel[],

  modelConfig: {
    model: "gpt-3.5-turbo" as ModelType,
    temperature: 0.5,
    top_p: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 4,
    compressMessageLengthThreshold: 1000,
    enableInjectSystemPrompts: true,
    template: DEFAULT_INPUT_TEMPLATE,
  },
};

export type ChatConfig = typeof DEFAULT_CONFIG;

//a5470
//midjourney功能 start
export type ChatConfigStore = ChatConfig & {
  reset: () => void;
  update: (updater: (config: ChatConfig) => void) => void;
  mergeModels: (newModels: LLMModel[]) => void;
  allModels: () => LLMModel[];
};
//midjourney功能 over

export type ModelConfig = ChatConfig["modelConfig"];

export function limitNumber(
  x: number,
  min: number,
  max: number,
  defaultValue: number,
) {
  if (typeof x !== "number" || isNaN(x)) {
    return defaultValue;
  }

  return Math.min(max, Math.max(min, x));
}

export const ModalConfigValidator = {
  model(x: string) {
    return x as ModelType;
  },
  max_tokens(x: number) {
    return limitNumber(x, 0, 100000, 2000);
  },
  presence_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  frequency_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  temperature(x: number) {
    return limitNumber(x, 0, 1, 1);
  },
  top_p(x: number) {
    return limitNumber(x, 0, 1, 1);
  },
};

//a5470
//原版 start
// export const useAppConfig = createPersistStore(
//   { ...DEFAULT_CONFIG },
//原版 over

//a5470
//midjourney功能 start
export const useAppConfig = create<ChatConfigStore>()(
  persist(
    //midjourney功能 over
    (set, get) => ({

      //a5470
      //midjourney功能 start
      ...DEFAULT_CONFIG,
      //midjourney功能 over

      reset() {
        set(() => ({ ...DEFAULT_CONFIG }));
      },

      //a5470
      //midjourney功能 start
      update(updater) {
        const config = { ...get() };
        updater(config);
        set(() => config);
      },
      //midjourney功能 over

      mergeModels(newModels: LLMModel[]) {
        if (!newModels || newModels.length === 0) {
          return;
        }

        const oldModels = get().models;
        const modelMap: Record<string, LLMModel> = {};

        for (const model of oldModels) {
          model.available = false;
          modelMap[model.name] = model;
        }

        for (const model of newModels) {
          model.available = true;
          modelMap[model.name] = model;
        }

        set(() => ({
          models: Object.values(modelMap),
        }));
      },

      allModels() {
        const customModels = get()
          .customModels.split(",")
          .filter((v) => !!v && v.length > 0)
          .map((m) => ({ name: m, available: true }));

        const models = get().models.concat(customModels);
        return models;
      },
    }),
    {
      name: StoreKey.Config,
      version: 3.8,
      migrate(persistedState, version) {
        const state = persistedState as ChatConfig;

        if (version < 3.4) {
          state.modelConfig.sendMemory = true;
          state.modelConfig.historyMessageCount = 4;
          state.modelConfig.compressMessageLengthThreshold = 1000;
          state.modelConfig.frequency_penalty = 0;
          state.modelConfig.top_p = 1;
          state.modelConfig.template = DEFAULT_INPUT_TEMPLATE;
          state.dontShowMaskSplashScreen = false;
          state.hideBuiltinMasks = false;
        }

        if (version < 3.5) {
          state.customModels = "claude,claude-100k";
        }

        if (version < 3.6) {
          state.modelConfig.enableInjectSystemPrompts = true;
        }

        if (version < 3.7) {
          state.enableAutoGenerateTitle = true;
        }

        if (version < 3.8) {
          state.lastUpdate = Date.now();
        }

        return state as any;
      },
    },
  ),

//a5470 midjourney功能新增圆括号
);
