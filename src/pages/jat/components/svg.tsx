import svg from "@/pages/jat/jat.svg";

export function SVG() {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
