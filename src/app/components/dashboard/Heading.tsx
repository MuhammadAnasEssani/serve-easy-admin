import React from 'react'

interface Heading {
  children?: any
  type?: string
}

export default function Heading(options: Heading) {
  return <div className={'theme-heading'}>{options.children}</div>
}
