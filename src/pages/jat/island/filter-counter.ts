import {
    FILTERS_CLASS,
    FILTER_COUNT_CLASS,
    FILTER_COUNT_WRAPPER_CLASS,
    FILTER_RESET_CLASS,
    RESET_FILTERS_EVENT,
} from "@/pages/jat/client.constants";

let generalCount = 0;

export class FilterCounter extends HTMLElement {
    count: number;
    detailsElement: HTMLDetailsElement | null;
    observer!: MutationObserver;
    filtersContainerElement: HTMLElement | null;

    constructor() {
        super();

        this.count = 0;
        this.detailsElement = this.querySelector("details");
        this.filtersContainerElement = document.querySelector(FILTERS_CLASS);
    }

    connectedCallback() {
        if (this.detailsElement) {
            this.observer = new MutationObserver(this.handleMutation.bind(this));
            this.observer.observe(this.detailsElement, { attributes: true, attributeFilter: ["open"] });
        }

        document.addEventListener(RESET_FILTERS_EVENT, this.reset.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener(RESET_FILTERS_EVENT, this.reset.bind(this));
    }

    handleMutation(mutationsList: MutationRecord[]) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "open") {
                if (!this.detailsElement?.hasAttribute("open")) {
                    this.counter();
                }
            }
        }
    }

    reset() {
        const items = Array.from(this.querySelectorAll("input")) as HTMLInputElement[];

        for (const item of items) {
            item.checked = false;
        }

        this.counter();

        document.removeEventListener(RESET_FILTERS_EVENT, this.reset.bind(this));
    }

    counter() {
        const items = Array.from(this.querySelectorAll("input")) as HTMLInputElement[];
        const count = items.filter((item) => item.checked).length;
        const summary = this.detailsElement?.querySelector(FILTER_COUNT_CLASS);
        const wrapper = this.detailsElement?.querySelector(FILTER_COUNT_WRAPPER_CLASS);
        const reset = this.filtersContainerElement?.querySelector(FILTER_RESET_CLASS);

        generalCount = count > this.count ? generalCount + count - this.count : generalCount - this.count + count;

        this.count = count;

        if (summary) summary.textContent = `${count}`;

        if (wrapper) {
            if (count === 0) {
                wrapper.classList.remove("flex");
                wrapper.classList.add("hidden");
            } else {
                wrapper.classList.remove("hidden");
                wrapper.classList.add("flex");
            }
        }

        if (reset) {
            if (generalCount === 0) {
                reset.classList.remove("flex");
                reset.classList.add("hidden");
            } else {
                reset.classList.remove("hidden");
                reset.classList.add("flex");
            }
        }
    }
}

customElements.define("filter-counter", FilterCounter);
