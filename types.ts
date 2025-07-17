export enum ToneStyle {
  INFORMATIF = 'Informatif',
  HUMORIS = 'Humoris',
  PROFESIONAL = 'Profesional',
  SANTAI = 'Santai',
  PROVOKATIF = 'Provokatif',
}

export enum HookType {
  PROBLEM_CALL_OUT = 'Problem Call Out',
  TARGET_CALL_OUT = 'Target Call Out',
  POTENTIAL_BENEFIT = 'Potential Benefit',
  SPECIFIC_NUMBER = 'Specific Number',
  SOCIAL_PROOF = 'Social Proof',
  ACTIVE_VOICE = 'Active Voice',
  CONFIDENCE_CONVICTION = 'Confidence & Conviction',
  PATTERN_INTERRUPT = 'Pattern Interrupt',
  WARNING_CAUTION = 'Warning & Caution',
  NEGATIVITY_BIAS = 'Negativity Bias',
}

export interface GenerationParams {
  idea: string;
  tone: ToneStyle;
  threadCount: number;
  hook: HookType;
  targetAudience: string;
  callToAction: string;
}

export interface Thread {
  content: string;
}