export const siteUrl = 'https://spyy.xyz';
export const siteTitle = 'Shivam Yewle | AI Full Stack Developer in Pune | spyy';
export const siteDescription = 'Shivam Yewle, AI Full Stack Developer in Pune. 3+ years building Next.js apps, Node.js APIs and Amazon Bedrock AI integrations. Open to freelance and full-time roles.';

export const profileSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`,
      name: 'spyy', alternateName: 'Shivam Yewle Portfolio', inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage', '@id': `${siteUrl}/#profile`, url: `${siteUrl}/`,
      name: siteTitle, description: siteDescription, inLanguage: 'en',
      isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person', '@id': `${siteUrl}/#person`, name: 'Shivam Yewle',
      alternateName: ['spyy', 'Spy-345'], url: `${siteUrl}/`,
      jobTitle: 'AI Full Stack Developer',
      description: 'AI Full Stack Developer with 3+ years of experience building production web applications, REST APIs and LLM-powered services.',
      email: 'yewleshivam.p@gmail.com',
      homeLocation: { '@type': 'Place', name: 'Pune, India' },
      worksFor: { '@type': 'Organization', name: 'Coherent Market Insights' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Fergusson College, Pune' },
      knowsAbout: ['Full stack web development', 'AI integration', 'Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'REST APIs', 'Python', 'Amazon Bedrock', 'Prompt engineering', 'PostgreSQL', 'MongoDB', 'AWS', 'E-commerce development'],
      sameAs: ['https://github.com/Spy-345', 'https://www.linkedin.com/in/shivam-yewle/'],
    },
  ],
};
