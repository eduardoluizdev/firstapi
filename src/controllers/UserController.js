let users = require("../mock/users");

module.exports = {
  listUsers(req, res) {
    const { order } = req.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    res.send(200, sortedUsers);
  },
  getUserById(req, res) {
    const { id } = req.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.send(400, { error: "User not found" });
    }

    res.send(200, user);
  },
  createUser(req, res) {
    const { body } = req;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    res.send(200, body);
  },
  updateUser(req, res) {
    let { id } = req.params;
    const { name } = req.body;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if (!userExists) {
      res.send(400, { error: "User not Found" });
    }

    users = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
        };
      }

      return user;
    });

    res.send(200, { id, name });
  },
};
