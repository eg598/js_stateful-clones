'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  const result = [];
  let prev = { ...state };

  for (const action of actions) {
    if (action.type === ADD_PROPERTIES) {
      for (const key in action.extraData) {
        prev[key] = action.extraData[key];
      }
      result.push({ ...prev });
      continue;
    }

    if (action.type === REMOVE_PROPERTIES) {
      const next = { ...prev };

      for (const key of action.keysToRemove) {
        delete next[key];
      }

      prev = next;
      result.push({ ...prev });
      continue;
    }

    if (action.type === CLEAR) {
      prev = {};
      result.push({});
      continue;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
