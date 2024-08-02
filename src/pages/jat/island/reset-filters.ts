import { RESET_FILTERS_EVENT } from "@/pages/jat/client.constants";

class ResetFilters extends HTMLButtonElement {
    connectedCallback() {
        this.addEventListener("click", this.resetFilters.bind(this));
    }

    resetFilters() {
        document.dispatchEvent(new CustomEvent(RESET_FILTERS_EVENT, { detail: true }));
    }
}

customElements.define("reset-filters", ResetFilters, { extends: "button" });
