export function customFootnotes() {
  return (tree) => {
    const footnotesList = tree.children.find(
      (node) =>
        node.type === "element" &&
        node.tagName === "section" &&
        node.properties.className?.includes("footnotes"),
    );

    if (footnotesList) {
      // Find the existing title (usually an <h2>)
      const existingTitle = footnotesList.children.find(
        (node) => node.type === "element" && node.tagName === "h2",
      );

      if (existingTitle) {
        // Change the tag to h1
        existingTitle.tagName = "h1";
        // You can also add custom classes if needed
        existingTitle.properties.className = ["footnotes-title"];
      }
    }
  };
}
