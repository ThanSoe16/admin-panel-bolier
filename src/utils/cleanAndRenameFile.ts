export function cleanAndRenameFile(originalFile: File): File {
  const cleanedFileName = originalFile.name.replace(/[^\p{L}\p{N}\p{M}\.\-_ ]/gu, '').trim();

  return new File([originalFile], cleanedFileName, {
    type: originalFile.type,
  });
}
