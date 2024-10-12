import yaml from 'js-yaml';

export async function loadYaml(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const colorGroup = yaml.load(text);
    return colorGroup;
  } catch (error) {
    console.error('Error loading YAML colorGroup:', error);
    return null;
  }
}
