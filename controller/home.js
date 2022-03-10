const ctrl= {}; 

ctrt.index = (req, res) =>{
    res.render('index', { title: 'Express' });
  };

module.exports = ctrl;