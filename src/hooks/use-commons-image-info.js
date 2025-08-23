import { useEffect, useState } from "react";
import { withPrefix } from "gatsby";
import { extractText } from "../utils/set-html-wrapper";

/**
 * Custom hook to fetch image information from Wikimedia Commons.
 * @param {string} imageUrl - The URL of the image that comes from Wikidata to fetch information for.
 * @returns {object} - An object containing image information (url, author, license, etc.) and loading state.
 */
// Example usage:
// const { url, author, license, licenseUrl, descUrl, loading } = useCommonsImageInfo(imageUrl);
// console.log("Image URL:", url);
// console.log("Author:", author);
// console.log("License:", license);
// console.log("License URL:", licenseUrl);
// console.log("Description URL:", descUrl);

export const useCommonsImageInfo = (imageUrl) => {
  const [data, setData] = useState({
    url: null,
    author: "Unknown",
    license: "Unknown",
    licenseUrl: "#",
    descUrl: "",
    loading: true,
  });

  useEffect(() => {

    if (!imageUrl || !imageUrl.includes("Special:FilePath")) {
      setData((prev) => ({ ...prev, url: withPrefix("/images/tool-dummy.png"), loading: false }));
      return;
    }

    const fileName = decodeURIComponent(imageUrl.split("/Special:FilePath/")[1]);
    const apiUrl = process.env.GATSBY_COMMONS_API_URL;

    if (!process.env.GATSBY_COMMONS_API_URL) {
      console.warn("GATSBY_COMMONS_API_URL is not defined. Please set it in your .env file.");
    }
    
    const params = {
        action: "query",
        format: "json",
        prop: "imageinfo",
        titles: "File:" + fileName,
        iiprop: "url|extmetadata"
    };
    const url = new URL(apiUrl);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    url.searchParams.append("origin", "*"); // CORS workaround

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const page = Object.values(json.query.pages)[0];
        if (!page || !page.imageinfo) return;

        const info = page.imageinfo[0];
        setData({
          url: info.url,
          author: info.extmetadata.Artist ? extractText(info.extmetadata.Artist?.value) : "Author not specified",
          license: info.extmetadata.LicenseShortName?.value || "Unknown",
          licenseUrl: info.extmetadata.LicenseUrl?.value || "#",
          descUrl: info.descriptionurl || "#",
          loading: false,
        });
      })
      .catch((err) => {
        console.error("Error loading image from Commons:", err);
        setData((prev) => ({ ...prev, loading: false }));
      });
  }, [imageUrl]);

  return data;
};