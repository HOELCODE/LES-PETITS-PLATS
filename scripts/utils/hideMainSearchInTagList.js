import { normalize } from "./normalize.js"

export const hideMainSearchInTagList = (searchedElement, tagList) => {
    tagList.forEach(tag => {
        const normalizedTag = normalize(tag.textContent);
        console.log(normalizedTag.textContent);
        if (normalize(searchedElement) === normalizedTag) {
            tag.style.display = "none";
        }
    });
}
