export const C_VALUES = {
  steel: {
    '#14 AWG': 389, '#12 AWG': 617, '#10 AWG': 981, '#8 AWG': 1557,
    '#6 AWG': 2425, '#4 AWG': 3806, '#3 AWG': 4774, '#2 AWG': 5907,
    '#1 AWG': 7293, '1/0 AWG': 8925, '2/0 AWG': 10755, '3/0 AWG': 12844,
    '4/0 AWG': 15082, '250 kcmil': 16483, '300 kcmil': 18177,
    '350 kcmil': 19704, '400 kcmil': 20566, '500 kcmil': 22185,
    '600 kcmil': 22965, '750 kcmil': 24137, '1000 kcmil': 25278,
  },
  nonmagnetic: {
    '#14 AWG': 389, '#12 AWG': 617, '#10 AWG': 982, '#8 AWG': 1559,
    '#6 AWG': 2430, '#4 AWG': 3826, '#3 AWG': 4811, '#2 AWG': 6044,
    '#1 AWG': 7493, '1/0 AWG': 9317, '2/0 AWG': 11424, '3/0 AWG': 13923,
    '4/0 AWG': 16673, '250 kcmil': 18594, '300 kcmil': 20868,
    '350 kcmil': 22737, '400 kcmil': 24297, '500 kcmil': 26706,
    '600 kcmil': 28033, '750 kcmil': 29735, '1000 kcmil': 31491,
  },
};

export const CONDUCTOR_SIZES = Object.keys(C_VALUES.steel);
