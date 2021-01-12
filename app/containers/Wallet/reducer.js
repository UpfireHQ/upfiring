import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  ALLOWANCE,
  APPROVE,
  BALANCE_OF_CONTRACT_TOKEN,
  BALANCE_OF_ETH,
  BALANCE_OF_TOKEN,
  CHANGE_BALANCE,
  GAS_PRICE,
  GAS_PRICE_DEFAULT,
  HISTORY,
  REDIRECT_AFTER_SET_WALLET,
  REFILL,
  REFILL_DONE,
  REFILL_INIT,
  REMOVE_WALLET,
  SET_WALLET,
  TOTAL_RECEIVING_OF,
  TOTAL_SPENDING_OF,
  WITHDRAW,
  WITHDRAW_DONE,
  WITHDRAW_INIT
} from './constants';
import { walletStore } from '../../utils/localStorage';

const address = walletStore.get('address');

const initialState = fromJS({
  address,
  [address]: walletStore.all()
});

export default typeToReducer({
  [SET_WALLET]: (state, action) => {
    const {address, publicKey, wallet} = action.payload;
    return state
      .set('address', String(address))
      .set(address, fromJS({address, publicKey, wallet}))
      .delete('disableChangeBalanceLoading')
      .delete('disableHistoryLoading')
      .delete('refillProgress')
      .delete('withdrawProgress');
  },

  [REMOVE_WALLET]: (state) => {
    return state.set('address', null);
  },

  [BALANCE_OF_ETH]: {
    SUCCESS: (state, action) => {
      const {address, balance} = action.payload;
      return state.setIn([address, 'ethBalance'], fromJS(balance));
    }
  },

  [BALANCE_OF_TOKEN]: {
    SUCCESS: (state, action) => {
      const {address, balance} = action.payload;
      return state.setIn([address, 'tokenBalance'], fromJS(balance));
    }
  },

  [BALANCE_OF_CONTRACT_TOKEN]: {
    SUCCESS: (state, action) => {
      const {address, balance} = action.payload;
      return state.setIn([address, 'availableBalance'], fromJS(balance));
    }
  },

  [APPROVE]: {
    SUCCESS: (state, action) => {
      const {address, tx} = action.payload;
      return state.setIn([address, 'refillStory', 'approve'], fromJS(tx));
    }
  },

  [ALLOWANCE]: {
    SUCCESS: (state, action) => {
      const {address, allowance} = action.payload;
      return state.setIn([address, 'refillStory', 'allowance'], fromJS(allowance));
    }
  },

  [REFILL]: {
    SUCCESS: (state, action) => {
      const {address, tx} = action.payload;
      return state.setIn([address, 'refillStory', 'refill'], fromJS(tx));
    }
  },

  [REFILL_INIT]: (state, action) => {
    const {address} = action.payload;
    return state.setIn([address, 'refillStory'], fromJS({})).set('refillProgress', true);
  },

  [REFILL_DONE]: (state, action) => {
    const {address} = action.payload;
    return state.deleteIn([address, 'refillStory']).delete('refillProgress');
  },

  [TOTAL_RECEIVING_OF]: {
    SUCCESS: (state, action) => {
      const {address, total} = action.payload;
      return state.setIn([address, 'totalReceiving'], fromJS(total));
    }
  },

  [TOTAL_SPENDING_OF]: {
    SUCCESS: (state, action) => {
      const {address, total} = action.payload;
      return state.setIn([address, 'totalSpending'], fromJS(total));
    }
  },

  [WITHDRAW]: {
    SUCCESS: (state, action) => {
      const {address, tx} = action.payload;
      return state.setIn([address, 'withdrawStory', 'withdraw'], fromJS(tx));
    }
  },

  [WITHDRAW_INIT]: (state, action) => {
    const {address} = action.payload;
    return state.setIn([address, 'withdrawStory'], fromJS({})).set('withdrawProgress', true);
  },

  [WITHDRAW_DONE]: (state, action) => {
    const {address} = action.payload;
    return state.deleteIn([address, 'withdrawStory']).delete('withdrawProgress');
  },

  [CHANGE_BALANCE]: {
    SUCCESS: (state, action) => {
      const {address, changeBalance} = action.payload;
      return state.setIn([address, 'changeBalance'], fromJS(changeBalance));
    },
    FAIL: (state) => state.set('disableChangeBalanceLoading', true)
  },

  [HISTORY]: {
    SUCCESS: (state, action) => {
      const {address, history} = action.payload;
      return state
        .setIn([address, 'history'], fromJS(history))
        .set('disableHistoryLoading');
    },
    FAIL: (state) => state.set('disableHistoryLoading', true)
  },

  [REDIRECT_AFTER_SET_WALLET]: (state, action) => {
    return action.payload
      ? state.set('redirectAfterSetWallet', action.payload)
      : state.delete('redirectAfterSetWallet');
  },

  [GAS_PRICE]: {
    SUCCESS: (state, {payload}) => state.set('gasPrice', payload),
    FAIL: (state) => state.update('oranges', (value = GAS_PRICE_DEFAULT) => value)
  }
}, initialState);
