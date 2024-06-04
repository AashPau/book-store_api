import Joi from "joi";

export const newUserValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      phone: Joi.string().allow("", null),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().required(),
      role: Joi.string().allow(null),
    });

    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newBookValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      thumbnail: Joi.string().required(),
      isbn: Joi.string().required(),
      publishedYear: Joi.number(),
      description: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const updateBookValidation = (req, res, next) => {
  try {
    console.log("inval");
    const schema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      thumbnail: Joi.string().required(),
      isAvailable: Joi.boolean().allow(null),
      expectedAvailable: Joi.date().allow(null, ""),
      publishedYear: Joi.number(),
      description: Joi.string().required(),
      _id: Joi.string(),
      status: Joi.string(),
    });
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

//==================Burrow =========
export const newBurrowValidation = (req, res, next) => {
  try {
    console.log("here");
    const schema = Joi.object({
      bookId: Joi.string().required(),
      bookTitle: Joi.string().required(),
      thumbnail: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

///Review val
export const newReviewValidation = (req, res, next) => {
  try {
    console.log("here");
    const schema = Joi.object({
      bookId: Joi.string().required(),
      bookTitle: Joi.string().required(),
      thumbnail: Joi.string().required(),
      ratings: Joi.number(),
    });
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
