import { StyleSheet, Platform } from "react-native";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const NAVY = {
  deepest:  '#050d1f',
  deep:     '#0a1628',
  dark:     '#0f2044',
  core:     '#122072',
  mid:      '#1a3299',
  bright:   '#2346c8',
  accent:   '#3d6eff',
  sky:      '#6b9fff',
  pale:     '#b8cfff',
  ghost:    '#e8eeff',
};

const NEUTRAL = {
  white:    '#ffffff',
  snow:     '#f7f9ff',
  mist:     '#eef1f9',
  fog:      '#dce3f2',
  silver:   '#b0bbd4',
  slate:    '#7a89a8',
  steel:    '#4a5878',
  ink:      '#1c2640',
};

const ACCENT = {
  danger:   '#d11a2a',
  dangerBg: '#fff0f1',
  success:  '#0d7a55',
  gold:     '#c9a227',
};

// ─── Shadows ─────────────────────────────────────────────────────────────────
const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: NAVY.core,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: { elevation: 6 },
    default: {},
  }),
  button: Platform.select({
    ios: {
      shadowColor: NAVY.bright,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
    },
    android: { elevation: 8 },
    default: {},
  }),
  input: Platform.select({
    ios: {
      shadowColor: NAVY.core,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  }),
};

// ─── StyleSheet ──────────────────────────────────────────────────────────────
export const styles = StyleSheet.create({

  // ── Screens ────────────────────────────────────────────────────────────────

  container: {
    flex: 1,
    backgroundColor: NEUTRAL.snow,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // ── Header ─────────────────────────────────────────────────────────────────

  headerBar: {
    backgroundColor: NAVY.core,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginHorizontal: -20,
    marginTop: 35,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: NAVY.deepest,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.30,
        shadowRadius: 14,
      },
      android: { elevation: 12 },
    }),
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: NEUTRAL.white,
    letterSpacing: 0.4,
  },

  subtitle: {
    fontSize: 13,
    color: NAVY.pale,
    marginTop: 2,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '500',
  },

  // ── Section label ──────────────────────────────────────────────────────────

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: NAVY.mid,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 8,
  },

  // ── Search bar ─────────────────────────────────────────────────────────────

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NEUTRAL.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: NEUTRAL.fog,
    ...shadow.input,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: NEUTRAL.ink,
    fontWeight: '400',
    paddingVertical: 0,
  },

  // ── Cards ──────────────────────────────────────────────────────────────────

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: NEUTRAL.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: NEUTRAL.fog,
    ...shadow.card,
  },

  cardLeft: {
    flex: 1,
    marginRight: 12,
  },

  cardAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: NAVY.ghost,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: NAVY.pale,
  },

  cardAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: NAVY.core,
    letterSpacing: 0.5,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardInfo: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: '700',
    color: NEUTRAL.ink,
    letterSpacing: 0.1,
    marginBottom: 3,
  },

  email: {
    fontSize: 12,
    color: NEUTRAL.slate,
    marginBottom: 1,
    letterSpacing: 0.1,
  },

  phone: {
    fontSize: 12,
    color: NEUTRAL.slate,
    letterSpacing: 0.1,
  },

  cardActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },

  // ── Icon buttons ───────────────────────────────────────────────────────────

  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBtnEdit: {
    backgroundColor: NAVY.ghost,
    borderWidth: 1,
    borderColor: NAVY.pale,
    marginLeft: -45,
  },

  iconBtnDelete: {
    backgroundColor: ACCENT.dangerBg,
    borderWidth: 1,
    borderColor: '#ffd6d9',
    marginLeft: -45,
  },

  // ── Primary button (Add person) ────────────────────────────────────────────

  primaryButton: {
    backgroundColor: NAVY.core,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
    ...shadow.button,
  },

  primaryButtonText: {
    color: NEUTRAL.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // ── Form (AddEditScreen) ───────────────────────────────────────────────────

  formContainer: {
    flex: 1,
    backgroundColor: NEUTRAL.snow,
    paddingHorizontal: 20,
  },

  formCard: {
    backgroundColor: NEUTRAL.white,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: NEUTRAL.fog,
    ...shadow.card,
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: NAVY.mid,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    backgroundColor: NEUTRAL.snow,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: NEUTRAL.fog,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: NEUTRAL.ink,
    fontWeight: '400',
    ...shadow.input,
  },

  inputFocused: {
    borderColor: NAVY.accent,
    backgroundColor: NEUTRAL.white,
  },

  // ── Form action buttons ────────────────────────────────────────────────────

  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 8,
  },

  saveButton: {
    flex: 1,
    backgroundColor: NAVY.core,
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadow.button,
  },

  saveButtonText: {
    color: NEUTRAL.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: NEUTRAL.white,
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: NEUTRAL.fog,
    ...Platform.select({
      ios: {
        shadowColor: NEUTRAL.ink,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },

  cancelButtonText: {
    color: ACCENT.danger,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // ── Divider ────────────────────────────────────────────────────────────────

  divider: {
    height: 1,
    backgroundColor: NEUTRAL.fog,
    marginVertical: 16,
  },

  // ── Empty state ────────────────────────────────────────────────────────────

  emptyList: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: NEUTRAL.silver,
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  emptyListSub: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 13,
    color: NEUTRAL.silver,
  },

  // ── Counter badge ──────────────────────────────────────────────────────────

  badge: {
    backgroundColor: NAVY.ghost,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: NAVY.mid,
    letterSpacing: 0.3,
  },

  // ── Pill / tag ─────────────────────────────────────────────────────────────

  pill: {
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    backgroundColor: NAVY.ghost,
  },

  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: NAVY.mid,
    letterSpacing: 0.4,
  },

});

// ─── Exported tokens (for inline use) ────────────────────────────────────────
export { NAVY, NEUTRAL, ACCENT };