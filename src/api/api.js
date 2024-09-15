// src/api/api.js

const API_BASE_URL = "http://localhost:5000/api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.json();
};

export const adjustImage = async (
  file,
  brightness,
  contrast,
  saturation,
  rotation,
  width,
  height
) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("brightness", brightness);
  formData.append("contrast", contrast);
  formData.append("saturation", saturation);
  formData.append("rotation", rotation);
  formData.append("width", width);
  formData.append("height", height);

  const response = await fetch(`${API_BASE_URL}/adjust`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to adjust image");
  }

  return response.json();
};
