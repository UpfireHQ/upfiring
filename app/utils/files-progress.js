/**
 * @class FilesProgress
 */
export class FilesProgress {

  progress = null;

  constructor(files = null, handler = null, timeout = 500) {
    if (files && handler) {
      this.init(files, handler, timeout);
    }
  }

  init(files, handler, timeout = 500) {
    this.progress = {files: {}, total: 0, length: 0, file: null};

    Array.from(files).forEach(file => {
      this.progress.files[file] = {total: file.size, length: 0};
      this.progress.total += file.size;
    });

    this._handler = (typeof handler === 'function') ? handler : () => {};
    this._interval = setInterval(() => this._handler(this.progress), timeout);
  }

  get listener() {
    return (file, length) => {
      if (!this.progress) {
        return;
      }
      if (this.progress.files[file]) {
        const byFile = this.progress.files[file];
        byFile.length += length;

        this.progress.file = file;
        this.progress.currentPercent = Math.floor((byFile.length / byFile.total) * 100 || 0);
      }

      this.progress.length += length;
      this.progress.allPercent = Math.floor((this.progress.length / this.progress.total) * 100 || 0);
    };
  };

  destroy() {
    clearInterval(this._interval);
    delete this._interval;
    delete this._handler;
    this.progress = null;
  };
}
