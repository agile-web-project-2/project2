/* GET 'about us' page */
module.exports.about = function(req, res) {
    res.render('generic-text', {
        title: 'About Pairletes',
        content: 'Pairletes was created to match like minded fitness individuals.\n\nMatthew Seneque\nStudent Number: ########\n\nKieran Quirke-Brown \nStudent Number: ########\n\n Debbie Yung \nStudent Number: 20365555\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.\n\nSuspendisse tincidunt, lectus non suscipit pharetra, purus ipsum vehicula sapien, a volutpat mauris ligula vel dui. Proin varius interdum elit, eu porttitor quam consequat et. Quisque vitae felis sed ante fringilla fermentum in vitae sem. Quisque fermentum metus at neque sagittis imperdiet. Phasellus non laoreet massa, eu laoreet nibh. Pellentesque vel magna vulputate, porta augue vel, dapibus nisl. Phasellus aliquet nibh nec nunc posuere fringilla. Quisque sit amet dignissim erat. Nulla facilisi. Donec in sollicitudin ante. Cras rhoncus accumsan rutrum. Sed aliquet ligula dui, eget laoreet turpis tempor vitae.'
    });
};

module.exports.homepage = function(req, res, next) {
    res.render('index', { title: 'Project 2', user: req.user });
};
