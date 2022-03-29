module.exports = (req, res, next) => {
    if (req.session.userID) {
        return redirect("/")
    }
    next();
};