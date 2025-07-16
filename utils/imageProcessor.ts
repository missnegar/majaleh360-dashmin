/**
 * Processes an image file in the browser: compresses it and converts it to WebP format.
 * If the file is not a processable image, it returns the original file.
 * @param {File} file The original image file (e.g., from an input or drag-and-drop).
 * @param {number} quality The quality of the output WebP image (0.0 to 1.0).
 * @param {number} maxWidth The maximum width of the output image.
 * @returns {Promise<{file: File, width: number, height: number}>} A promise that resolves with the processed image file (as a WebP) and its dimensions.
 */
export const processAndCompressImage = (file: File, quality = 0.8, maxWidth = 1920): Promise<{ file: File; width: number; height: number; }> => {
  return new Promise((resolve, reject) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
      // Don't process non-images, SVGs, or GIFs.
      // For images we can't process, we try to get dimensions.
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ file, width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        // If we can't even load it as an image, resolve without dimensions.
        resolve({ file, width: 0, height: 0 });
      };
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Calculate new dimensions
        const scaleFactor = maxWidth / img.width;
        const newWidth = img.width > maxWidth ? maxWidth : img.width;
        const newHeight = img.width > maxWidth ? img.height * scaleFactor : img.height;

        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert canvas to blob, then to file
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            // Create a new file with a .webp extension
            const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
            const newFileName = `${originalName}.webp`;
            
            const newFile = new File([blob], newFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve({ file: newFile, width: newWidth, height: newHeight });
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};