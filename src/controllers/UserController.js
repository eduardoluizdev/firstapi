const users = require("../mock/users");

module.exports = {
  listUsers(req, res) {
    const { order } = req.query;

    console.log(order);

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(sortedUsers));
  },
};
