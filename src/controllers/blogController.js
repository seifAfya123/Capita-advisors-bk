const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, description, brief, image } = req.body;
    const blog = new Blog({
      title,
      description,
      brief,
      image,
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, description, brief, image } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.title = title;
    blog.description = description;
    blog.brief = brief;
    blog.image = image;

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ___________________________Client_______________

exports.getAllBlogs = async (req, res) => {
  try {
    const { language } = req.query;  
    

    if (language && !['en', 'ar'].includes(language)) {
      return res.status(400).json({ message: 'Invalid language. Choose "en" or "ar".' });
    }

    const filter = language ? {
      [`title.${language}`]: { $exists: true },
      [`description.${language}`]: { $exists: true },
      [`brief.${language}`]: { $exists: true }
    } : {};

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { language } = req.query;  

    if (!['en', 'ar'].includes(language)) {
      return res.status(400).json({ message: 'Invalid language. Choose "en" or "ar".' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const selectedBlog = {
      title: blog.title[language],
      description: blog.description[language],
      brief: blog.brief[language],
      image: blog.image,
    };

    res.status(200).json(selectedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentBlogs = async (req, res) => {
  try {
    const { language, limit = 5 } = req.query;  

    if (language && !['en', 'ar'].includes(language)) {
      return res.status(400).json({ message: 'Invalid language. Choose "en" or "ar".' });
    }

    const filter = language ? {
      [`title.${language}`]: { $exists: true },
      [`description.${language}`]: { $exists: true },
      [`brief.${language}`]: { $exists: true }
    } : {};

    const recentBlogs = await Blog.find(filter).sort({ createdAt: -1 }).limit(parseInt(limit));
    res.status(200).json(recentBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
