export async function refresh(selector: string, href: string = location.href) {
    const res = await fetch(href, { method: "GET" });
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const newContent = doc.querySelector(selector);
    const oldContent = document.querySelector(selector);

    const body = document.querySelector("body");

    if (newContent && oldContent) {
        oldContent.replaceWith(newContent);
    } else if (!newContent) {
        oldContent?.remove();
    }

    document.querySelector("body")?.scrollTo(body?.scrollLeft || 0, body?.scrollTop || 0);
}
