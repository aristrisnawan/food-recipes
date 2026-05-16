import { Platform } from 'react-native';

export const Colors = {
  // Primary — Orange
  primary:       '#E8650A',
  primaryLight:  '#F0892D',
  primaryDark:   '#C4530A',
  primarySoft:   '#FEF0E6',

  // Text
  textPrimary:   '#111111',
  textSecondary: '#555555',
  textTertiary:  '#999999',
  textWhite:     '#FFFFFF',

  // Background & Surface
  background:    '#F5F5F5',
  surface:       '#FFFFFF',
  border:        '#E5E5E5',

  // Semantik
  success:       '#2ECC71',
  danger:        '#E74C3C',
  warning:       '#F39C12',
  star:          '#FFD700',

  // Light & Dark mode (untuk komponen bawaan Expo)
  light: {
    text:           '#111111',
    background:     '#F5F5F5',
    tint:           '#E8650A',
    icon:           '#555555',
    tabIconDefault: '#999999',
    tabIconSelected:'#E8650A',
  },
  dark: {
    text:           '#ECEDEE',
    background:     '#151718',
    tint:           '#F0892D',
    icon:           '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected:'#F0892D',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif:   "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:    "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});