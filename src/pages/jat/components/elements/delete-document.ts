import { API_ADMIN_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";

import { refresh } from "@/pages/jat/lib/refresh";

class DeleteDocument extends HTMLButtonElement {
    uuid: string;
    name: string;

    constructor() {
        super();

        this.uuid = this.getAttribute("uuid") || "";
        this.name = this.getAttribute("name") || "";

        this.deleteDocument = this.deleteDocument.bind(this);
    }

    connectedCallback() {
        this.uuid = this.getAttribute("uuid") || "";
        this.name = this.getAttribute("name") || "";

        this.addEventListener("click", this.deleteDocument);
    }

    async deleteDocument() {
        this.uuid = this.uuid ?? this.getAttribute("uuid");
        this.name = this.name ?? this.getAttribute("name");

        const res = await fetch(`${API_ADMIN_JOB_APPLICATION_PATH}/${this.uuid}/document/${encodeURIComponent(this.name)}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uuid: this.uuid,
                name: this.name,
            }),
        });

        if (!res.ok && res.status < 500) {
            const json = await res.json();

            console.error(json);
        } else {
            await refresh(".js-documents");
        }
    }
}

if (!customElements.get("delete-document")) {
    customElements.define("delete-document", DeleteDocument, { extends: "button" });
}

export default DeleteDocument;
