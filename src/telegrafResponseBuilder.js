/**
 * @param {import('@cfworker/web').ResponseBuilder} res
 */
module.exports = res => {
  let writableEnded = false;
  const modRes = Object.assign(res, {
    headersSent: false,
    setHeader: (name, value) => res.headers.set(name, value),
    end: data => {
      console.log('data:', data);
      if (writableEnded) return;
      res.body = data;
      writableEnded = true;
    },
  });
  Object.defineProperty(modRes, 'writableEnded', {
    get: () => writableEnded,
  });
  return modRes;
};
