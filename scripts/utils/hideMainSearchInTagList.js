import { normalize } from "./normalize.js"

export const hideMainSearchInTagList = (searchedElement, tagList) => {
    for (let i = 0; i < tagList.length; i++) {
        const tag = tagList[i];
        const normalizedTag = normalize(tag.textContent);
        if (normalize(searchedElement) === normalizedTag) {
            tag.style.display = "none";
        }
    }
}