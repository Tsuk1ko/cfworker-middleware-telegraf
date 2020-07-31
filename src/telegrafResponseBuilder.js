module.exports = res => {
  return new Proxy(
    Object.assign(res, {
      set: (...args) => res.headers.set(...args),
      header: res.headers,
    }),
    {
      set(obj, prop, value) {
        if (prop === 'body' && ['Object', 'Array'].includes(Object.getPrototypeOf(value).constructor.name)) {
          obj.body = JSON.stringify(value);
          obj.headers.set('content-type', 'application/json');
          return true;
        }
        return Reflect.set(...arguments);
      },
    }
  );
};
