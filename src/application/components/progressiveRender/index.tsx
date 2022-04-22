import React from "react"

const Defer = ({ chunkSize, children }: any): any => {
  const [renderedItemsCount, setRenderedItemsCount] = React.useState(chunkSize)

  const childrenArray = React.useMemo(() => React.Children.toArray(children), [children])

  React.useEffect(() => {
    if (renderedItemsCount < childrenArray.length) {
      window.requestIdleCallback(
        () => {
          setRenderedItemsCount(Math.min(renderedItemsCount + chunkSize, childrenArray.length))
        },
        { timeout: 2400 },
      )
    }
  }, [renderedItemsCount, childrenArray.length, chunkSize])

  return childrenArray.slice(0, renderedItemsCount)
}

const ProgressiveRender = ({ children }: any): any => (
  <Defer chunkSize={1}>
    <React.Fragment />
    {children}
  </Defer>
)

export default ProgressiveRender
