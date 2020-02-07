import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import '../styles/index.css'
import BlockContent from '../components/block-content'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      profilePic {
        asset {
          url
          originalFilename
        }
      }
      _rawBody
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className='titleIntro'>
          <h1>Welcome to {`${site.title.charAt(0).toLowerCase()}${site.title.slice(1)}`}</h1>
          <img src={site.profilePic.asset.url} className='profilePic' width='200' position='center' />
          <div className=''>
            {site._rawBody && <BlockContent blocks={site._rawBody || []} />}
          </div>
        </div>
        {projectNodes && (
          <ProjectPreviewGrid
            title='Latest projects'
            nodes={projectNodes}
            browseMoreHref='/archive/'
            className='testing'
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
