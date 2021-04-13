module.exports = (schema) => {
  let formatsStorage = data => data;
  schema.setFormat = function setFormat(transformer) {
    formatsStorage = transformer;
  };
  schema.statics.format = function format(data, options = {}) {
    return formatsStorage(data, options);
  };
  schema.statics.formatAll = function formatAll(data, options = {}) {
    return data.map(item => this.format(item, options));
  };
  schema.methods.format = function format(options = {}) {
    return this.constructor.format(this.toObject(), options);
  };
  schema.set('toObject', {
    getters: true,
    virtuals: true,
  });
};

