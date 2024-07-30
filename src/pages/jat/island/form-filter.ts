import { refresh } from "@/pages/jat/lib/refresh";
import { CLOSE_DETAILS_MENU_EVENT } from "@/pages/jat/constants";

class FormFilter extends HTMLFormElement {
    connectedCallback() {
        this.addEventListener("submit", this.handleSubmit.bind(this));
        this.addEventListener("reset", this.handleSubmit.bind(this));
        document.addEventListener(CLOSE_DETAILS_MENU_EVENT, this.handleSubmit.bind(this));
    }

    [key: string]: unknown;

    async handleSubmit(e: Event) {
        if (e.type === "reset") {
            refresh("table", window.location.href);
            return;
        }

        e.preventDefault();

        const formData = new FormData(this);
        const url = new URL(window.location.href);

        formData.forEach((value, key) => {
            const isSpecialKey = /workplace|job_type|status/.test(key);
            const values = isSpecialKey ? formData.getAll(key).join(",") : value;

            url.searchParams.set(key, String(values));
        });

        refresh("table", url.toString());
    }
}

if (!customElements.get("form-filter")) {
    customElements.define("form-filter", FormFilter, { extends: "form" });
}

export default FormFilter;
