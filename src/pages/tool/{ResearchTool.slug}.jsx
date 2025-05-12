import * as React from "react"
import { Link, graphql } from "gatsby"

export default function ToolPage({ data }) {
  const { researchTool } = data
  
  return (
    <main>
      <h1>{researchTool._id}</h1>
      <p>Concepts: {researchTool.concepts.map((concept, index) => (
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

export const Head = ({ data }) => (
  <>
    <title>{data.researchTool.label}</title>
  </>
)

export const query = graphql`
  query ToolPage($slug: String!) {
    researchTool(slug: { eq: $slug }) {
      _id
      concepts {
        _id
        label
      }
      label
      description
    }
  }
`