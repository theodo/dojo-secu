export const getRoleFromUserRoles = userRoles => {
  if (userRoles) {
    if (userRoles.includes('dc3fb2d8fd87034775d6e7e4026e59c199cf63d7')) {
      return 'level_seven';
    } else if (userRoles.includes('0547b54a15fe99260bbcc5ac8bc5a08bbaeb7dd8')) {
      return 'level_six';
    } else if (userRoles.includes('4c84cdeab3c6f801550e5d7a69dad9589807cdca')) {
      return 'level_five';
    } else if (userRoles.includes('deba90042e6610e4a87d4d6711f61f774a1808b0')) {
      return 'level_four';
    } else if (userRoles.includes('370315690cfb42749c656c302369ce14291e1380')) {
      return 'level_three';
    } else if (userRoles.includes('a59ca43c08454e124ed252830b811dd63649e62a')) {
      return 'level_two';
    } else {
      return 'level_one';
    }
  } else {
    return null;
  }
};

export default getRoleFromUserRoles;
