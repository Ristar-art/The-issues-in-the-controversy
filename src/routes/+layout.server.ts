export function load() {
  return {
    footer: {
      tagline: 'From the family at openface fellowship.',
      quickLinks: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about us' },
        { label: 'Topics', href: '/topics' },
        // { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' }
      ],
      socialLinks: [
        { icon: 'facebook', href: '#' },
        { icon: 'instagram', href: '#' },
        { icon: 'tiktok', href: '#' }
      ],
      copyright: '© Open face fellowship. All Rights Reserved.'
    }
  };
}