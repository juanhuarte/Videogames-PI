export function validationFunc(input) {
  let errors = {};
  if (input.name.length === 0) errors.name = "Name is required";
  if (input.realiseDate.length === 0)
    errors.realiseDate = "Realise Date is required";
  if (input.rating.length === 0) errors.rating = "Rating is required";
  else if (input.rating < 0 || input.rating > 5)
    errors.rating = "Rating must be beteween 0 and 5";
  if (input.description.length < 5)
    errors.description = "Description is required";
  if (input.background_img.length === 0)
    errors.background_img = "Background Image is required";
  if (input.genres.length === 0) errors.genres = "Genres is required";
  if (input.platforms.length === 0) errors.platforms = "Platforms is required";
  return errors;
}
