import { NOTE_COMMENT_ID, NOTE_TITLE_ID } from "@/config/shared/jat.constants";
import { ADD_NOTE_ELEMENT, NOTE_TEMPLATE_ID_NAME } from "@/pages/jat/constants";

class AddNote extends HTMLButtonElement {
    #template: HTMLTemplateElement | null;
    #counter: number;

    constructor() {
        super();

        this.#counter = 0;
        this.#template = document.getElementById(NOTE_TEMPLATE_ID_NAME) as HTMLTemplateElement;
        this.addNote = this.addNote.bind(this);
    }

    connectedCallback() {
        this.addEventListener("click", this.addNote);
    }

    addNote() {
        const templateContent = this.#template?.content;
        const parent = this.#template?.parentNode;

        if (templateContent) {
            this.#counter = Date.now() + Math.floor(Math.random());
            const clone = document.importNode(templateContent, true);

            const title = clone.getElementById(NOTE_TITLE_ID) as HTMLElement;
            const titleLabel = clone.querySelector(`label[for="${NOTE_TITLE_ID}"]`) as HTMLElement;
            const comment = clone.getElementById(NOTE_COMMENT_ID) as HTMLElement;
            const commentLabel = clone.querySelector(`label[for="${NOTE_COMMENT_ID}"]`) as HTMLElement;

            title.id = `${NOTE_TITLE_ID}-${this.#counter}`;
            titleLabel.setAttribute("for", `${NOTE_TITLE_ID}-${this.#counter}`);
            comment.id = `${NOTE_COMMENT_ID}-${this.#counter}`;
            commentLabel.setAttribute("for", `${NOTE_COMMENT_ID}-${this.#counter}`);

            parent?.appendChild(clone);
        }
    }
}

if (!customElements.get(ADD_NOTE_ELEMENT)) {
    customElements.define(ADD_NOTE_ELEMENT, AddNote, { extends: "button" });
}

export default AddNote;
