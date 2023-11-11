export default defineAppConfig({
  docus: {
    title: 'Very Good Fetch',
    description: '✨ All you need is a super powerfull Fetch() API',
    socials: {
      github: 'ahmedragab20/very-good-fetch',
    },
    github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'ahmedragab20/very-good-fetch',
      owner: 'ahmedragab20',
      edit: false
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    },
    footer: {
      credits: {
        icon: '',
        text: 'Made with ❤️ by Ahmed Ragab',
        href: 'https://github.com/ahmedragab20'
      }
    }
  },
  
})
