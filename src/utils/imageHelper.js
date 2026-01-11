export const getCleanImage = (imgData) => {
    if (!imgData) return "/fallback.png";

    let img = imgData;

    // Handle array input (e.g., product.images array)
    if (Array.isArray(imgData)) {
        if (imgData.length === 0) return "/fallback.png";
        img = imgData[0];
    }

    try {
        // Check if the image string is a stringified JSON array
        if (typeof img === "string" && img.startsWith('["') && img.endsWith('"]')) {
            const parsed = JSON.parse(img);
            img = parsed[0];
        } else if (typeof img === "string" && img.startsWith("[\"") && img.endsWith("\"]")) {
            const parsed = JSON.parse(img);
            img = parsed[0];
        }

        if (!img) return "/fallback.png";

        // Clean up formatting (some API images have extra quotes or brackets)
        if (typeof img === "string") {
            // Remove surrounding brackets or quotes if mistakenly left
            img = img.replace(/^\["?|"?]$/g, '').replace(/^"|"$/g, '');

            if (img.startsWith("http://") || img.startsWith("https://")) {
                return img;
            }
            // Add https if missing but looks like a domain
            if (img.startsWith("www.")) {
                return `https://${img}`;
            }
        }

        return img && img.length > 5 ? img : "/fallback.png";
    } catch (error) {
        console.error("Error parsing image URL:", error);
        return "/fallback.png";
    }
};
