/*
    We need this HTML wrapper because the image description from the Wikimedia API is in HTML format sometimes
    and we want to display it as plain text.
*/
export const extractText = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
};