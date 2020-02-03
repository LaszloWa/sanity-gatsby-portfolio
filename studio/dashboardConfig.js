export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e3883b84282a7f609052a4a',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-o2pascv8',
                  apiId: '2beb760f-2c3d-4c22-9f06-a66c35640251'
                },
                {
                  buildHookId: '5e3883b8212fcca407dd6b95',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-vb7ccqmd',
                  apiId: '9d56f1f7-50cd-421b-bf66-40fe5b8511cb'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/LaszloWa/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-vb7ccqmd.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
