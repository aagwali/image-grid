import React from "react"

import { ContextHeader } from "./styles"
import { ContextHeaderProps } from "./types"

export const Header = ({ contextLabel }: ContextHeaderProps) => <ContextHeader children={contextLabel} />
