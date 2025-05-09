import * as React from "react"
import { Link, graphql, HeadFC } from "gatsby"

export default function ToolPage({ data }) {
  const { tool } = data
  return (
    <main>
      <h1>{tool._id}</h1>
      <p>Concepts: {tool.concepts.map((concept, index) => (
        <span key={index} className="d-block">
          <a href={concept._id.trim()} target='_blank' rel="noopener noreferrer" className='icon-link icon-link-hover'>
            {concept.label.trim()}
          </a>
        </span>
      ))}
      </p>
      <br />
      <Link to="/">Back to home page</Link>
    </main>
  );
}

/*export const Head{ post } = ({ data: { post } }) => (
  <React.Fragment>
    <title>{post.title}</title>
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🌈</text></svg>"
    />
  </React.Fragment>
)*/

export const query = graphql`
  query ToolPage($slug: String!) {
    researchTool(slug: { eq: $slug }) {
      _id
      concepts {
        label
      }
    }
  }
`