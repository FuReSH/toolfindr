
export const useTadirahLabels = () => {
  require('tbbt-ld')
  const { join, dirname } = require('path')
  //           node_modules/tbbt-ld/dist/tbbt.nq
  const tbbt = join(dirname(require.resolve('tbbt-ld')), 'dist/tbbt.nq')
  
  const fromFile = require('rdf-utils-fs/fromFile')
  const stream = fromFile(tbbt)
  
  stream.on('data', quad => {
    console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`)
  })

    return data.site.siteMetadata
}