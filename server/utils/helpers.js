module.exports = {
  contentFor: function(name, options) {
    if (!this._sections) {
      this._sections = {};
    }
    this._sections[name] = options.fn(this);
  },
  ifEquals: function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
};
