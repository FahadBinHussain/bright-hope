export default {
  base: '/', 
  title: 'Bright Hope Organization',
  description: 'Supporting communities in need',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Programs', link: '/programs' },
      { text: 'Contact', link: '/contact' },
    ],
    sidebar: {
      '/': [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        {
          text: 'Our Programs',
          children: [
            { text: 'Program 1', link: '/programs/program1' },
            { text: 'Program 2', link: '/programs/program2' }
          ]
        },
        { text: 'Contact', link: '/contact' },
      ]
    },
  }
}
