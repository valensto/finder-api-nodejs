const viewHome = function (req, res) {
  res.send("welcome to the home page");
};

const viewContact = function (req, res) {
  res.send("welcome to the contact page");
};

module.exports = {
  viewHome,
  viewContact,
};
