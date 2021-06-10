module.exports = {
  pages: {
    demo: {
      // entry for the page
      entry: 'src/pages/demo/main.js',
      // the source template
      template: 'public/demo.html',
      // output as dist/demo.html
      filename: 'demo.html'
    },
    about: {
        entry: 'src/pages/about/main.js',
        template: 'public/about.html',
        filename: 'about.html',
        title: 'About Page'
    }
  }
}
