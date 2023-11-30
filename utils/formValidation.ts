export const validateURL = (url: string, platform: string) => {
  if (!url) {
    return 'Please check the URL';
  }

  // Ensure URL contains the platform name
  if (platform && !url.toLowerCase().includes(platform.toLowerCase())) {
    return `The URL should contain the platform name (${platform}).`;
  }

  return '';
};

export const validatePlatform = (platform: string) => {
  if (!platform) {
    return 'Please select a platform.';
  }
  return '';
};
