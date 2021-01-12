import { addStatisticAction } from '../../containers/App/actions';
import { dispatch } from '../../store';

class SeedStatisticDispatcher {
  constructor() {
    this._seed = 0;
    this._interval = setInterval(() => {
      if (this._seed > 0) {
        const payload = {seed: this._seed};
        dispatch(addStatisticAction(payload));
        this._seed = 0;
      }
    }, 1000);
  }

  onUpload(bytes) {
    this._seed += bytes;
  };
}

export default new SeedStatisticDispatcher();
