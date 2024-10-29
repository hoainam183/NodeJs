module.exports = {
    login: (req,res) => {
        if(req.user) {
            return res.redirect('/');
        }
        const error = req.flash('error');
        res.render('auth/login',{error, layout: 'auth/layout'});
    }
}