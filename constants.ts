import { ToneStyle, HookType, Language } from './types';

export const TONE_STYLES: ToneStyle[] = [
  ToneStyle.INFORMATIF,
  ToneStyle.HUMORIS,
  ToneStyle.PROFESIONAL,
  ToneStyle.SANTAI,
  ToneStyle.PROVOKATIF,
];

export const HOOK_TYPES: HookType[] = [
  HookType.PROBLEM_CALL_OUT,
  HookType.TARGET_CALL_OUT,
  HookType.POTENTIAL_BENEFIT,
  HookType.SPECIFIC_NUMBER,
  HookType.SOCIAL_PROOF,
  HookType.ACTIVE_VOICE,
  HookType.CONFIDENCE_CONVICTION,
  HookType.PATTERN_INTERRUPT,
  HookType.WARNING_CAUTION,
  HookType.NEGATIVITY_BIAS,
];

export const LANGUAGES: Language[] = [
  Language.INDONESIA,
  Language.ENGLISH,
];