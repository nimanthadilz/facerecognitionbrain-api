const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select("*")
        .from("users")
        .where({ id })
        .then((users) => {
            if (users.length) {
                res.json(users[0]);
            } else {
                res.json("not found");
            }
        })
        .catch((err) => res.json("Error getting that user"));
};

module.exports = {
    handleProfileGet
}