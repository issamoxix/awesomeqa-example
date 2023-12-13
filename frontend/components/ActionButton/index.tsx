import * as React from "react"
import { Button, Stack } from "@mui/material";
import style from "./button.module.css"

export const ActionButton = ({text, href, Icon}) => <Button
    variant="contained"
    className={style.ActionButton}
    href={href}
>
    <Stack
        direction="column"
        className={style.Stack}
        alignItems="center"
        spacing={1}
    >
        <Icon className={style.Icon} />
        <span>{text}</span>
    </Stack>
</Button>