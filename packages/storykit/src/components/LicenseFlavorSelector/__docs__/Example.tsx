import React, { FC, useState } from "react"

import LicenseFlavorSelector, { LicenseFlavorSelectorProps } from "../LicenseFlavorSelector"

const Example: FC<LicenseFlavorSelectorProps> = (props) => {
  const [value, setValue] = useState(props.value)
  return <LicenseFlavorSelector {...props} value={value} onValueChange={setValue} />
}

export default Example
