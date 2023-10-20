const { excludedQueryFields } = require("../validations/excludedFields");
const { RESPONSE_TEXT, STATUS_CODES } = require("./response");

exports.getAll = async (
  req,
  res,
  model,
  excludedFieds = ["__v"],
  populate = { required: false },
  msg = "Successful"
) => {
  try {
    let requestQueryObject = { ...req.query }; //make a copy of the req.query object

    excludedQueryFields.forEach(
      (element) => delete requestQueryObject[element]
    ); //delete any key in the requestQueryObject containing an element in the  excludedQueryField  array

    //advance query using gte,lte,gt,lt
    let queryToString = JSON.stringify(requestQueryObject);
    queryToString = queryToString.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );

    let query = model
      .find(JSON.parse(queryToString))
      .select(excludedFieds.length ? `-${excludedFieds.join(" -")}` : []); // the .select excludes any spacified field before sending the document

    //sorting query result
    if (req.query.sort) {
      // to sort pass the sort param ie ?sort="field1,field2,..." //ascending
      // to sort pass the sort param ie ?sort="-field1,-field2,..." //descending
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //field limiting
    //pass a parameter called field eg. ?fields=field1,field2,...
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v ");
    }

    //populate with realtionships
    if (populate.required) {
      if (populate.columns.length >= 1) {
        query = query.populate(populate.field, populate.columns);
      } else {
        query = query.populate(populate.field);
      }
    }

    //pagination
    //pass page and pageSize params  eg  ?page=1&pageSize=20

    const page = req.query.page * 1 || 1;
    const pageSize = req.query.pageSize * 1 || 20;
    const skip = (page - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    //handle a case where user specify page that does not exists
    let numberOfDocument = await model.countDocuments();
    if (req.query.page) {
      if (skip >= numberOfDocument) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
          statusCode: STATUS_CODES.NOT_FOUND,
          responseText: RESPONSE_TEXT.FAIL,
          errors: [{ msg: "This page does not exist" }],
        });
      }
    }
    //execute query
    const result = await query; // query.sort().select().skip().limit()

    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: { msg, total: numberOfDocument, resource: result },
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
exports.getOne = async (
  req,
  res,
  model,
  excludedFieds = ["__v"],
  populate = { required: false },
  msg = "Successful"
) => {
  try {
    let resource = model
      .findById(req.params.id)
      .select(excludedFieds.length ? `-${excludedFieds.join(" -")}` : [])
      .populate();

    //populate with realtionships
    if (populate.required) {
      if (populate.columns.length >= 1) {
        resource = resource.populate(populate.field, populate.columns);
      } else {
        resource = resource.populate(populate.field);
      }
    }
    resource = await resource;
    if (!resource) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Resource not found" }],
      });
    }
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: { msg, resource },
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message }],
    });
  }
};
exports.updateDocument = async (req, res, model) => {
  try {
    const resource = await model.findById(req.params.id);
    if (!resource) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Resource not found" }],
      });
    }

    const updatedResoure = await model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    const resouceToReturn = { ...updatedResoure._doc };
    return resouceToReturn;
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message }],
    });
  }
};
exports.deleteDocument = async (
  req,
  res,
  model,
  msg = "Resource deleted successfully"
) => {
  try {
    const resource = await model.findById(req.params.id);
    if (!resource) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Resource not found" }],
      });
    }
    await model.findByIdAndRemove(req.params.id);
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: {
        msg,
        resource: {},
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message }],
    });
  }
};
exports.createDocument = async (
  req,
  res,
  model,
  msg = "Resource Created Successfully"
) => {
  try {
    const createdResource = await model.create(req.body);

    let resource = { ...createdResource._doc };

    return { msg, resource };
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message }],
    });
  }
};
