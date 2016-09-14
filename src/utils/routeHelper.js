export const handleError = (routeCallback) => {
  return (req, res, next) => {
    routeCallback(req,res).catch(next);
  };
};
