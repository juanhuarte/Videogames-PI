export function validationFunc(input) {
  let errors = {};
  if (input.name.length === 0) errors.name = "NAME IS REQUIRED!!";
  if (input.realiseDate.length === 0)
    errors.realiseDate = "REALISE DATE IS REQUIRED!!";
  if (input.rating.length === 0) errors.rating = "RATING IS REQUIRED!!";
  else if (input.rating < 0 || input.rating > 5)
    errors.rating = "0 < RATING < 5 !!";
  if (input.description.length < 5)
    errors.description = "DESCRIPTION IS REQUIRED!!";
  if (input.background_img.length === 0)
    errors.background_img = "BACKGROUND IMAGE IS REQUIRED!!";
  if (input.genres.length === 0) errors.genres = "GENRES IS REQUIRED!!";
  if (input.platforms.length === 0)
    errors.platforms = "PLATFORMS IS REQUIRED!!";
  return errors;
}
