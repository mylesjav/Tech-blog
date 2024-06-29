const router = require('express').Router();
const { User, Blog, Comments} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({ include: User, Comments })
        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

        res.render('home', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect them to home
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect them to home
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signUp');
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include:[
          {
            model: Comments, include: {
              model: User,
              attributes: ['id', 'username']
            }
          },
          {
            model: User,
            attributes: ['id','username']
          }
        ]
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;