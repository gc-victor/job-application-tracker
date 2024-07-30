// @see: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemcheckbox_role#keyboard_interactions
import { CLOSE_DETAILS_MENU_EVENT } from "@/pages/jat/constants";

class DetailsMenu extends HTMLElement {
    observer!: MutationObserver;
    parentDetails: HTMLDetailsElement | null;

    constructor() {
        super();

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.parentDetails = this.closest("details");

        if (this.parentDetails) {
            this.observer = new MutationObserver(this.handleMutation.bind(this));
            this.observer.observe(this.parentDetails, { attributes: true, attributeFilter: ["open"] });
        }
    }

    connectedCallback() {
        if (this.parentDetails) {
            this.observer = new MutationObserver(this.handleMutation.bind(this));
            this.observer.observe(this.parentDetails, { attributes: true, attributeFilter: ["open"] });
        }
    }

    disconnectedCallback() {
        this.removeEventListener("keydown", this.handleKeyDown);
    }

    open() {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";

        document.addEventListener("click", this.handleOutsideClick);

        this.addEventListener("keydown", this.handleKeyDown);

        (this.querySelector("input") as HTMLElement)?.focus();
    }

    close() {
        document.body.style.position = "";
        document.body.style.width = "";

        document.removeEventListener("click", this.handleOutsideClick);

        this.parentDetails?.focus();
        this.parentDetails?.removeAttribute("open");

        this.removeEventListener("keydown", this.handleKeyDown);

        document.dispatchEvent(new CustomEvent(CLOSE_DETAILS_MENU_EVENT));
    }

    handleMutation(mutationsList: MutationRecord[]) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "open") {
                if (this.parentDetails?.hasAttribute("open")) {
                    this.open();
                } else {
                    this.close();
                }
            }
        }
    }

    handleOutsideClick(event: Event) {
        const target = event.target as Node;

        if (!this.parentDetails?.contains(target)) {
            this.parentDetails?.removeAttribute("open");
        }
    }

    handleKeyDown(event: KeyboardEvent) {
        const key = event.key;
        const items = this.querySelectorAll("input");
        const current = document.activeElement as HTMLElement;

        if (this.parentDetails?.contains(current)) {
            const actions = {
                Enter: () => {
                    current.click();
                    this.close();
                },
                " ": () => {
                    current.click();
                    event.preventDefault();
                },
                Escape: () => {
                    this.close();
                },
                ArrowRight: () => this.moveFocus(1),
                ArrowLeft: () => this.moveFocus(-1),
                ArrowDown: () => this.moveFocus(1),
                ArrowUp: () => this.moveFocus(-1),
                Home: () => (items[0] as HTMLElement).focus(),
                End: () => (items[items.length - 1] as HTMLElement).focus(),
            };

            if (actions[key as keyof typeof actions]) {
                actions[key as keyof typeof actions]();
            } else if (key.length === 1) {
                this.moveFocusByChar(key);
            }
        }
    }

    moveFocus(direction: number) {
        const items = Array.from(this.querySelectorAll("input")) as HTMLElement[];
        const current = document.activeElement as HTMLElement;

        if (this.parentDetails?.contains(current)) {
            const nextIndex = (items.indexOf(current) + direction + items.length) % items.length;
            items[nextIndex]?.focus();
        }
    }

    moveFocusByChar(char: string) {
        const items = Array.from(this.querySelectorAll("input")) as HTMLElement[];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const id = item.id;
            const label = this.querySelector(`label[for="${id}"]`);
            const itemText = label?.textContent?.trim().toLowerCase();

            if (itemText && itemText.charAt(0) === char.toLowerCase()) {
                item.focus();
                return;
            }
        }
    }
}

customElements.define("details-menu", DetailsMenu);
