exports.getErrorPage = {
  pageTitle: "Page not Found",
  path: "error",
  isAuthenticated: false,
};

exports.get500Page =(req, res, next) => {
  res.status(500).render('500',{
    pageTitle: "Error!",
    path: "error",
    isAuthenticated: false,
  })
};
