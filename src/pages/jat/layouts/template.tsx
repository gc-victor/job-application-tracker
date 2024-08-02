import type { ComponentChildren } from "preact";

export function Head({ children }: { children?: ComponentChildren }) {
    return (
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html" />

            <link rel="apple-touch-icon" type="image/svg" href="/_/asset/public/images/cache/favicon/favicon.svg" />
            <link rel="icon" type="image/svg" href="/_/asset/public/images/cache/favicon/favicon.svg" sizes="any" />
            <link rel="mask-icon" type="image/svg" href="/_/asset/public/images/cache/favicon/favicon-black.svg" />

            {children}
        </head>
    );
}

export function Body({ children, ...props }: { children?: ComponentChildren; [key: string]: unknown | unknown[] }) {
    return (
        <body class="overflow-y-scroll" {...props}>
            {children}
        </body>
    );
}
