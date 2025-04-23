/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import * as React from "react"
import { withPrefix } from "gatsby"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // Use local font: https://www.gatsbyjs.com/docs/how-to/styling/using-local-fonts/
    <link
      rel="preload"
      href={withPrefix("/fonts/D-DIN.woff2")}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="internal-font-regular"
    />,
    <link
      rel="preload"
      href={withPrefix("/fonts/D-DIN-Bold.woff2")}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="internal-font-bold"
    />
  ])
}
