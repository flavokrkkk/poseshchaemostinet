export const getStaticImage = (folderName: string) => {
  const imageModules = import.meta.glob(
    "/public/images/посещаемости-net/*/*.{jpg,jpeg,png,gif}",
    {
      eager: true,
    }
  );

  return Object.keys(imageModules)
    .filter((key) => {
      const pathParts = key.split("/");
      const parentFolder = pathParts[pathParts.length - 2];
      return parentFolder === folderName;
    })
    .map((key) => {
      return key.replace("/public", "");
    });
};
