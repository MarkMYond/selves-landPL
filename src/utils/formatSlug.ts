// Utility function to convert a string into a URL-friendly slug
const format = (val: string): string =>
  val
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word chars except hyphens
    .toLowerCase(); // Convert to lowercase

export default format;
