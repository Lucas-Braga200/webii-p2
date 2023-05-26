module.exports = {
  contentFor: function(name, options) {
    if (!this._sections) {
      this._sections = {};
    }
    this._sections[name] = options.fn(this);
  }
};
