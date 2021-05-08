import type { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'
import * as path from 'path'
import { promises as fs } from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'

export default function Component({ code, frontmatter }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      {frontmatter.title}
      <Component />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'box' } }],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.resolve(
    process.cwd(),
    '../ui/src/components/Box/Box.mdx'
  )
  const contents = await fs.readFile(filePath, 'utf-8')
  const { code, frontmatter } = await bundleMDX(contents, {
    cwd: path.dirname(filePath),
  })
  return {
    props: {
      code,
      frontmatter,
    },
  }
}
